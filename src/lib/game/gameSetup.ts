import type { InitResult } from "$lib/api";
import { supabaseAdmin } from "$lib/supabase";
import { initInventory } from "./inventory/initSetup";

export const initGame = async (id: string): Promise<InitResult> => {
    const invRes = await initInventory(id);
    if (invRes.error) {
        return invRes;
    }

    const dbRes = await supabaseAdmin.from("game").insert({
        gathering: "",
    });
    if (dbRes.error) {
        return {
            error: dbRes.error.message,
            status: null,
            data: null,
        };
    }
    return {
        status: "Successfully initialized game db.",
        data: null,
        error: null,
    };
};
