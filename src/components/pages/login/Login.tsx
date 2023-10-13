import React from 'react';
import './Login.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import { getAllUsers } from 'data/getRequests';

export function Login() {
    const [users, setUsers] = React.useState<any>();
    const [dataFetched, setDataFetched] = React.useState<boolean>(false);
    React.useEffect(()=> {
        const users = getAllUsers();
        setUsers(users);
        setDataFetched((prevState) => !prevState);
    }, []);

    React.useEffect(()=>{
        console.log("users fetched... refresh, users: ", users);
    }, [dataFetched]);

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
