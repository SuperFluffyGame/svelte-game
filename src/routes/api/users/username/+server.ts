import type { RequestHandler } from "@sveltejs/kit";
import {
    apiResult,
    type CreateUserResult,
    type Icon,
    type GetStringResult,
} from "$lib/api";
import { supabase, supabaseAdmin } from "$lib/supabase";

export const GET: RequestHandler = async e => {
    const jwt = e.request.headers.get("X-supabase-jwt");
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
    const dbRes = await supabaseAdmin
        .from("users")
        .select("username")
        .filter("uid", "eq", userRes.data.user.id)
        .single();

    return apiResult({
        data: dbRes.data?.username,
    } as GetStringResult);
};
