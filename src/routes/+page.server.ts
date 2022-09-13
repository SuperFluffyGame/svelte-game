import type { PageServerLoad } from "../../.svelte-kit/types/src/routes/$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = () => {
    throw redirect(303, "/auth/signin");
};
