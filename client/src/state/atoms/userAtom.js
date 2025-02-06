import { atom } from 'recoil';

export const userAtom = atom({
    key: 'users',
    default: {
        _id: null,
        email: "",
        name: "",
    }
});