import type { RequestHandler } from "@sveltejs/kit";
import type { CreateUserResult } from "$lib/api";
import { supabase, supabaseAdmin } from "$lib/supabase";

export const GET: RequestHandler = async (e) => {
    const jwt = e.request.headers.get("X-supabase-jwt");
    const name = e.url.searchParams.get("name");
    const email = e.url.searchParams.get("email");

    if (jwt == null) {
        return new Response(
            JSON.stringify({
                error: "JWT header missing from request.",
            } as CreateUserResult)
        );
    }
    if (name == null) {
        return new Response(
            JSON.stringify({
                error: "Name url parameter missing from request.",
            } as CreateUserResult)
        );
    }
    if (email == null) {
        return new Response(
            JSON.stringify({
                error: "Email url parameter missing from request.",
            } as CreateUserResult)
        );
    }

    const user = await supabase.auth.getUser(jwt);
    if (user.error) {
        return new Response(
            JSON.stringify({
                error: `User Error: ${user.error.message}`,
            } as CreateUserResult)
        );
    }

    // set name
    const sqlRes = await supabaseAdmin.from("users").insert({
        username: name,
        email,
    });

    if (sqlRes.error) {
        return new Response(
            JSON.stringify({
                error: `Unable to insert to db: ${sqlRes.error.message}`,
            })
        );
    }

    return new Response(
        JSON.stringify({
            status: "Successfully created user.",
        } as CreateUserResult)
    );
};
