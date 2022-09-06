import fs from "fs";
import { root } from "../../path";
export const dataPath = root + "/data";
// "C:/Users/super/OneDrive/Documents/coding/JS/svelte-game/data";
export const usernamePath = dataPath + "/usernames.json";

export const getUsernames = () => {
    return JSON.parse(fs.readFileSync(usernamePath).toString());
};

export const setUsernames = (names: object) => {
    fs.writeFileSync(usernamePath, JSON.stringify(names, null, 4));
};

export const setUsername = (id: string, name: String) => {
    const usernames = getUsernames();
    usernames[id] = name;
    setUsernames(usernames);
};