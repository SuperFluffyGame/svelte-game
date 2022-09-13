import { supabase } from "./supabase";
import { isEmailAvailable, isUsernameAvailable } from "./data";
import * as Texts from "./texts";

export interface SignupResult {
    error: string | null;
}
export const signup = async (
    email: string,
    password: string,
    username: string
): Promise<SignupResult> => {
    if (!isEmailAvailable(email)) {
        return {
            error: Texts.EmailUnavailable,
        };
    }
    if (!isUsernameAvailable(username)) {
        return {
            error: Texts.UsernameUnavailable,
        };
    }

    const signupRes = await supabase.auth.signUp({
        email,
        password,
    });

    if (signupRes.error) {
        return {
            error: signupRes.error.message,
        };
    }

    const insertRes = await supabase.from("users").insert([
        {
            username,
            email,
        },
    ]);

    if (insertRes.error) {
        throw "Unexpected db insert fail.";
    }

    return {
        error: null,
    };
};

export interface SigninResult {
    error: string | null;
}
export const signin = async (
    email: string,
    password: string
): Promise<SigninResult> => {
    const singinRes = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (singinRes.error) {
        return {
            error: singinRes.error.message,
        };
    }

    return {
        error: null,
    };
};
