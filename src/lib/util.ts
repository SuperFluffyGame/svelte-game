export const numberToString = (value: number): string => {
    const formatter = new Intl.NumberFormat("en", {
        compactDisplay: "short",
        notation: "compact",
    });

    return formatter.format(value);
};
