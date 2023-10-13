import React from 'react';
import './Login.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import { getAllUsers } from 'data/getRequests';
import VideoSpray from "resources/videos/eden-spray.mp4";

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

            <div className={"loginPageContent"}>

                <div className={'left-container'}>
                    <div className={"videoContainer"}>
                        <video autoPlay loop muted height={"100%"} width={"100%"}>
                            <source src={VideoSpray} type={"video/mp4"}/>
                        </video>
                    </div>
                </div>
                <div className={'right-container'}>
                    <p>Login Page</p>
                    <p>User name : </p> <input/>
                    <p>Password : </p> <input/>
                </div>
            </div>
        </div>
    )
}
export default Login;
