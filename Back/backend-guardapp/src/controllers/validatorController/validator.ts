export function validatePassword(password: string): boolean {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,18}$/;
    return pattern.test(password);
}

export function validateEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

export function isArrayofStrings(arr: any[]): arr is string[]{
    return arr.every((item) => typeof item === "string");
}