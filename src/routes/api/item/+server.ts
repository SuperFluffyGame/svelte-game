import { getItem } from "$lib/data";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = (e) => {
    let id = e.url.searchParams.get("item");

    if (id == undefined) {
        return new Response(
            JSON.stringify({
                error: "ID required.",
            })
        );
    }
    let item = getItem(id);

    return new Response(JSON.stringify(item));
};
