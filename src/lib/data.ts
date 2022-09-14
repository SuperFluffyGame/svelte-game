import { supabase } from "./supabase";

export const isEmailAvailable = async (email: string): Promise<boolean> => {
    const { data: emails } = await supabase.from("users").select("username");

    return emails?.find?.((e) => e.username == email) != undefined;
};
