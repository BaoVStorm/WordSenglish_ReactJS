export function isEmpty(value: string): boolean {
    return value.trim() === '';
}

export function isInvalidEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value);
}
