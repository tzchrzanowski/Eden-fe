
export const clearPhotoUrl = (url: string): string => {
    if (url) {
        if (url.charAt(0) == '\"') {
            const cleanPhoto = url.slice(1, -1);
            return cleanPhoto;
        }
        return url;
    }
    return "";
}

export const getToken = (): string => {
    const token: string = localStorage.getItem("token") || '';
    return token;
}
