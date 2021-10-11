export function roundDecimalPlaces(value, places) {
    return value ? parseFloat(value).toFixed(places) : 0;
}