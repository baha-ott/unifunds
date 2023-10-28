export function doesURLincludeValidPath(str: string) {
    if (str.includes("landing") || str.includes("sign-up") || str.includes("auth")) {
        return true;
    }

    return false;
}