import { useSetRecoilState } from "recoil";
import { authAtom } from "../../state/atoms/authAtom";
import { userAtom } from "../../state/atoms/userAtom";
import axios from 'axios';

function useAuth(){
    const queryURL = `${import.meta.env.VITE_BACKEND_API_URL_LOCAL}/auth/login`;
    const setAuth = useSetRecoilState(authAtom);
    const setUser = useSetRecoilState(userAtom);

    const login = async (email, password) => {
        try {
            const data = await axios.post(queryURL, {email, password});

            //We assume that request went through, we can set the email, and token to the user and auth atoms
            setAuth({
                token: data.data.token,
                isAuthenticated: true
            });

            //TODO: We also need to store the token in the localStorage or as cookies.
            localStorage.setItem('authToken', data.data.token);

            //TODO: need to make changes here, it is currently undefined, because json webtoken is not currently decoded.
            // setUser({email: data.email, name: data.name});

            return data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message || 'Login failed');
            }
            throw new Error(error.message || 'Login failed');
        }
    };

    return { login }
}

export default useAuth;