import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = () => {
    throw redirect(300, "/auth/signin");
};
