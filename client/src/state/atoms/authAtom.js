import { atom, selector } from "recoil";


// Auth atom to store token and user authentication state
export const authAtom = atom({
  key: "authState",
  default: {
    token: localStorage.getItem("authToken") || null,
    isAuthenticated: false,
  },
});

//This selector is used to tell whether the user is authenticated or not.
export const isAuthenticatedSelector = selector({
  key: 'isAuthenticatedSelector',
  get: ({get}) => {
    const auth = get(authAtom);
    return Boolean((auth.token) && (auth.isAuthenticated));
  }
});
