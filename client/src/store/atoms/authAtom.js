import { atom } from "recoil";

// Auth atom to store token and user authentication state
export const authAtom = atom({
  key: "authState",
  default: {
    token: null,
    isAuthenticated: false,
  },
});
