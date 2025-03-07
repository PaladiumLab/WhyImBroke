import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedSelector } from "../../state/atoms/authAtom";

function PrivateRoute () {
    const auth = useRecoilValue(isAuthenticatedSelector);
    return (
        auth ? <Outlet/> : <Navigate to="/login" />
    )
}

export default PrivateRoute
