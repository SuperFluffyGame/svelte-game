import { supabase } from "./supabase";

export interface ApiResult<Data = null> {
    error: string | null;
    status: string | null;
    data: Data | null;
}

export const apiResult = (json: object) => {
    return new Response(JSON.stringify(json));
};

export type CreateUserResult = ApiResult<{}>;
export type IsAvailableResult = ApiResult<boolean>;
export type GetStringResult = ApiResult<string>;
export type InitResult = ApiResult;

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

export interface Icon {
    type: "builtin" | "custom";
    data: string;
}
export const createCharacter = async (
    name: string,
    icon: Icon
): Promise<CreateUserResult> => {
    const res = await (
        await jwtFetch(
            `/api/users/create-character?name=${name}&icon=${encodeURIComponent(
                JSON.stringify(icon)
            )}`
        )
    ).json();

    return res as CreateUserResult;
};
