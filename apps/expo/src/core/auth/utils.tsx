import { getItem, removeItem, setItem } from "@/core/storage";

const TOKEN = "token";

export interface TokenType {
  access: string;
  refresh: string;
}

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
//export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

export const setToken = (value: TokenType): void =>
  value ? setItem<TokenType>(TOKEN, value) : removeItem(TOKEN); // remove token if value is null or undefined
