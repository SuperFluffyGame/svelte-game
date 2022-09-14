import { supabase } from "./supabase";
import { isEmailAvailable } from "./data";
import * as Texts from "./texts";
import type { IsAvailableResult } from "./api";

export interface SignupResult {
    error: string | null;
}
export const signup = async (
    email: string,
    password: string,
): Promise<SignupResult> => {
    const emailAvailRes = (await (
        await fetch(`/api/users/emailavailable?email=${email}`)
    ).json()) as IsAvailableResult;
    if (!emailAvailRes.data) {
        return {
            error: Texts.EmailUnavailable,
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
