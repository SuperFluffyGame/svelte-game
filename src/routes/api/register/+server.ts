import { register } from "$lib/register";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = e => {
    let username = e.url.searchParams.get("name");

    if (username == undefined) {
        return new Response("false");
    }
    let status = register(username);

    return new Response(JSON.stringify(status));
};
