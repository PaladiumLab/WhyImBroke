import { useSetRecoilState } from "recoil";
import { authAtom } from "../../state/atoms/authAtom";
import { userAtom } from "../../state/atoms/userAtom";
import axios, { AxiosResponse } from 'axios';

interface AuthResponse {
    token: string,
    response: string
}

interface UserData {
    email?: string,
    name?: string
}

const baseURL = import.meta.env.VITE_BACKEND_API_URL_LOCAL
const queryURL = `${baseURL}/auth/login`

function useAuth(){
    const setAuth = useSetRecoilState(authAtom);
    const setUser = useSetRecoilState(userAtom);

    const login = async (email: string, password: string): Promise<AuthResponse> => {
        try {
            const response = await axios.post<AuthResponse>(queryURL, {email, password});

            //We assume that request went through, we can set the email, and token to the user and auth atoms
            setAuth({
                token: response.data.token,
                isAuthenticated: true
            });

            //TODO: We also need to store the token in the localStorage or as cookies.
            localStorage.setItem('authToken', response.data.token);

            //TODO: need to make changes here, it is currently undefined, because json webtoken is not currently decoded.
            // setUser({email: data.email, name: data.name});

            return response.data;
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