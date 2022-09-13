import { supabase } from "./supabase";

export const isUsernameAvailable = async (name: string): Promise<boolean> => {
    const { data: users } = await supabase.from("users").select("username");

    return users?.find?.((v) => v.username == name) != undefined;
};
export const isEmailAvailable = async (email: string): Promise<boolean> => {
    const { data: emails } = await supabase.from("users").select("username");

    return emails?.find?.((e) => e.username == email) != undefined;
};
