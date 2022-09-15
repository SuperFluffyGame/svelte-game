import type { InitInventoryResult } from "$lib/api";
import { supabaseAdmin } from "$lib/supabase";

export interface Item {
    count: number;
    id: string | null;
}
const initItem = (): Item => {
    return {
        id: null,
        count: 0,
    };
};

export interface EquippedItems {
    helmet: Item;
    chestplate: Item;
    leggings: Item;
    boots: Item;
    mainWeapon: Item;
    secondaryWeapon: Item;
}
const initEquippedItems = (): EquippedItems => {
    return {
        helmet: initItem(),
        chestplate: initItem(),
        leggings: initItem(),
        boots: initItem(),
        mainWeapon: initItem(),
        secondaryWeapon: initItem(),
    };
};

export const initInventory = async (
    id: string
): Promise<InitInventoryResult> => {
    const equipped = initEquippedItems();

    const dbRes = await supabaseAdmin.from("inventory").insert({
        uid: id,
        equipped,
        weapons_tools: [],
        armor: [],
        crafting: [],
        upgrading: [],
    });

    if (dbRes.error) {
        return {
            error: dbRes.error.message,
            status: null,
            data: null,
        };
    }
    return {
        status: "Successfully initialized inventory.",
        data: null,
        error: null,
    };
};
