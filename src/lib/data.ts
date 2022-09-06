import fs from "fs";
import { usernamePath, itemPath } from "../../path";

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

export const getItemList = () => {
    return JSON.parse(fs.readFileSync(itemPath).toString());
};

export interface Item {
    name: string;
    power: number;
    cost: number;
    rating: number;
}
export const getItem = (id: string): Item => {
    return getItemList()[id] ?? null;
};
