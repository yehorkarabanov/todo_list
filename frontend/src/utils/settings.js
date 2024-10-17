export const DOMAIN = process.env.REACT_APP_DOMAIN;
export const VERIFY_MAIL_PATH = process.env.REACT_APP_VERIFY_MAIL_PATH;
export const PASSWORD_RESET_PATH = process.env.REACT_APP_PASSWORD_RESET_PATH;

export const BASE_URL = "https://" + DOMAIN;
export const API_URL = BASE_URL + "/api";
export const VERIFY_MAIL_URL = BASE_URL + VERIFY_MAIL_PATH;
export const PASSWORD_RESET_URL = BASE_URL + PASSWORD_RESET_PATH;

export const USER_PATH = "/user";
export const LOGIN_PATH = USER_PATH + "/login";
export const REGISTER_PATH = USER_PATH + "/register";

export const baseAxiosSettings = {
    baseURL: API_URL,
    timeout: 5000,
}
