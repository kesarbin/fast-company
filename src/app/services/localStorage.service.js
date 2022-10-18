const TOKEY_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refreshToken";
const EXPIRES_KEY = "jwt-expires";

export function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEY_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEY_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}
export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate
};

export default localStorageService;
