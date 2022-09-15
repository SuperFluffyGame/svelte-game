import type { RequestHandler } from "@sveltejs/kit";
import { apiResult, type CreateUserResult, type Icon } from "$lib/api";
import { supabase, supabaseAdmin } from "$lib/supabase";

const isUsernameValid = (n: string | null): { error: string | null } => {
    if (n == null) {
        return {
            error: "Username cannot be null.",
        };
    }
    if (n.length < 5 || n.length > 15) {
        return {
            error: "Username must be between 5 and 15 characters.",
        };
    }

    const match = /[A-Za-z_][A-Za-z0-9_]*/.test(n);
    if (!match) {
        return {
            error: "Username can only be letters, numbers, or an underscore, but not start with a number",
        };
    }
    return {
        error: null,
    };
};

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
    const dbRes = await supabaseAdmin.from("users").select("username");
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
        uid: userRes.data.user.id,
        username: name,
        icon: icon,
    });
    if (dbUserWriteRes.error) {
        return apiResult({
            error: `DB write fail: ${dbUserWriteRes.error.message}`,
        } as CreateUserResult);
    }
    return apiResult({
        status: "Successfully created character.",
    } as CreateUserResult);
};
