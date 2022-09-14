import { supabase } from "./supabase";

export interface ApiResult<Data> {
    error: string | null;
    status: string | null;
    data: Data | null;
}

export type CreateUserResult = ApiResult<{}>;
export type IsAvailableResult = ApiResult<boolean>;

export const jwtFetch = async (url: string): Promise<Response> => {
    const session = (await supabase.auth.getSession()).data.session;
    const jwt = session?.access_token;
    if (!jwt) {
        throw "Unable to get user JWT";
    }
    const res = await fetch(url, {
        headers: {
            "X-supabase-jwt": jwt,
        },
    });

    return res;
};
