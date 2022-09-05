import { getUsernames } from "$lib/data";
import { login } from "$lib/register";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = e => {
    const id = e.url.searchParams.get("id");

    const status = login(id);

    return new Response(JSON.stringify(status));
};
