import { getUsernames, setUsername } from "./data";

const usernameAvailable = (username: string) => {
    const usernames = getUsernames();

    let available = true;
    for (const id in usernames) {
        if (usernames[id] == username) {
            available = false;
            break;
        }
    }

    return available;
};

export interface RegisterStatus {
    error: boolean;
    statusMsg: string;
    userid: string | null;
}

export const register = (username: string): RegisterStatus => {
    const id = randomUserID();
    const status = usernameStatus(username);
    if (status.error) {
        return {
            error: true,
            statusMsg: status.statusMsg,
            userid: null,
        };
    }

    setUsername(id, username);
    return {
        error: false,
        statusMsg: "Successfully set username.",
        userid: id,
    };
};

export const randomUserID = () => {
    let r = Math.floor(Math.random() * 2 ** 32);
    return r.toString(16).padStart(8, "0");
};

const usernameRegex = /[a-zA-Z_][a-zA-Z_0-9]*/;

export interface UsernameStatus {
    valid: boolean;
    available: boolean;
    statusMsg: string;
    error: boolean;
}

export const usernameStatus = (u: string): UsernameStatus => {
    let match = usernameRegex.exec(u)?.[0] ?? "";
    if (!(match == u) && match) {
        return {
            valid: false,
            available: false,
            statusMsg:
                "Invalid character: " + u[match?.length ?? 0] ?? "" + ".",
            error: true,
        };
    }
    if (match.length < 5 || match.length > 15) {
        return {
            valid: false,
            available: false,
            statusMsg: "Username must be between 5 and 15 characters long.",
            error: true,
        };
    }

    if (!usernameAvailable(u)) {
        return {
            valid: true,
            available: false,
            statusMsg: "Username not available.",
            error: true,
        };
    } else {
        return {
            valid: true,
            available: false,
            statusMsg: "Username available.",
            error: false,
        };
    }
};
