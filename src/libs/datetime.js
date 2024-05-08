export function dbTimeForHumans(str) {
    return str.replace('T', ' ').substring(0, 16);
}