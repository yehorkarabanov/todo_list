import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {NotFound} from "./components/NotFound";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {LOGIN_PATH, PASSWORD_RESET_PATH, REGISTER_PATH, USER_PATH, VERIFY_MAIL_PATH} from "./utils/settings";
import {UserVerifyPage} from "./pages/UserVerifyPage";
import {LogoutPage} from "./pages/LogoutPage";
import {PasswordResetEmail} from "./pages/PasswordResetEmail";
import {PasswordResetConfirm} from "./pages/PasswordResetConfirm";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={LOGIN_PATH} element={<LoginPage/>}/>
            <Route path={REGISTER_PATH} element={<RegisterPage/>}/>
            <Route path={USER_PATH + "/logout"} element={<LogoutPage/>}/>
            <Route path={VERIFY_MAIL_PATH + "/:token"} element={<UserVerifyPage/>}/>
            <Route path={PASSWORD_RESET_PATH} element={<PasswordResetEmail/>}/>
            <Route path={PASSWORD_RESET_PATH + "/:token"} element={<PasswordResetConfirm/>}/>
            <Route path={"/not-found"} element={<NotFound/>}/>
            <Route path={"*"} element={<NotFound/>}/>
        </Routes>
    );
}

export default App;
