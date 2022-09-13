const formatter = new Intl.NumberFormat("en", {
    compactDisplay: "short",
    notation: "compact",
});

export const numberToString = (value: number): string => {
    return formatter.format(value);
};
