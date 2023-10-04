import React from 'react';
import './Login.css';
import TopNavigation from "components/top-navigation/TopNavigation";

export function Login() {
    return (
        <div className={"loginWrapper"}>
            <TopNavigation />
            <div className={"pageContent"}>
                <p>Login Page</p>
                <p>User name : </p> <input/>
                <p>Password : </p> <input/>
            </div>
        </div>
    )
}
export default Login;
