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

    // return new Response(JSON.stringify(item));
};
