import type { RequestHandler } from "@sveltejs/kit";
import { apiResult, type CreateUserResult, type Icon } from "$lib/api";
import { supabase, supabaseAdmin } from "$lib/supabase";
import { initGame } from "$lib/game/gameSetup";

export const GET: RequestHandler = async e => {
    const jwt = e.request.headers.get("X-supabase-jwt");
    const name = e.url.searchParams.get("name");

    // get the user from jwt
    if (!jwt) {
        return apiResult({
            error: `Invalid JWT.`,
        } as CreateUserResult);
    }
    const userRes = await supabase.auth.getUser(jwt);
    if (userRes.error) {
        return apiResult({
            error: `Invalid JWT.`,
        } as CreateUserResult);
    }
    const uid = userRes.data.user.id;

    // check username validity
    let v = isUsernameValid(name);
    if (v.error) {
        return apiResult({
            error: `Invalid Username: ${v.error}`,
        } as CreateUserResult);
    }

    // check icon validity and parse it
    const iconStr = e.url.searchParams.get("icon");
    let icon: Icon;
    try {
        icon = JSON.parse(iconStr!);
    } catch (e) {
        return apiResult({
            error: "Malformed JSON in icon url parameter.",
        } as CreateUserResult);
    }
    if (icon.type == "custom" && icon.data.length == 0) {
        return apiResult({
            error: "Invalid custom icon.",
        } as CreateUserResult);
    }

    // make sure username isnt already in use
    const dbRes = await supabaseAdmin
        .from("users")
        .select("username")
        .filter("username", "eq", name);
    if (dbRes.error) {
        return apiResult({
            error: `DB read fail: ${dbRes.error.message}`,
        } as CreateUserResult);
    }
    if (dbRes.data.length > 0) {
        return apiResult({
            error: "Username Taken.",
        } as CreateUserResult);
    }

    // write the user data.
    const dbUserWriteRes = await supabaseAdmin.from("users").insert({
        username: name,
        icon,
        uid,
    });
    if (dbUserWriteRes.error) {
        return apiResult({
            error: `DB write fail: ${dbUserWriteRes.error.message}`,
        } as CreateUserResult);
    }

    const initGameRes = await initGame(uid);
    if (initGameRes.error) {
        await supabaseAdmin.from("users").delete().filter("uid", "eq", uid);
        return apiResult({
            error: `Failed to create inventory: ${initGameRes.error}`,
        } as CreateUserResult);
    }

    return apiResult({
        status: "Successfully created character.",
    } as CreateUserResult);
};
