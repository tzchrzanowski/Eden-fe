import React from 'react';
import './Login.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import { getAllUsers } from 'data/getRequests';
import VideoSpray from "resources/videos/eden-spray.mp4";
import {loginUser} from "data/postRequests";
import Logo from "resources/images/eden-crest-transparent-white.png"

export function Login() {
    const [users, setUsers] = React.useState<any>();
    const [dataFetched, setDataFetched] = React.useState<boolean>(false);
    const [loginFormData, setLoginFormData] = React.useState({username: '', password: ''});
    const [loading, setLoading] = React.useState<boolean>(false);

    /*
    * On initialization:
    * Get all users from endpoint that does not require authentication for testing purpose
    * and store users in local state variable
    */
    React.useEffect(()=> {
        async function fetchData() {
            const fetchedUsers = await getAllUsers();
            setUsers(fetchedUsers);
            setDataFetched(true);
        }
        fetchData();
    }, []);

    React.useEffect(()=>{
        console.log("users fetched... refresh, users: ", users);
    }, [dataFetched]);


    /*
    * update state with login credentials on user input:
    */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginFormData({...loginFormData, [name]: value});
    }

    /*
    * Login and Store authentication token into local storage:
    * */
    const sendLoginRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        loginUser(loginFormData.username, loginFormData.password)
            .catch(error => console.log("login error: ", error));
        setLoading(false);
    };

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
                    <img src={Logo} alt={"logo"} width={"250px"} />
                    <p>Login Page</p>
                    <form onSubmit={sendLoginRequest}>
                        <div>
                            <label htmlFor={"username"}>Username: </label>
                            <input
                                type={"text"}
                                id={"username"}
                                name={"username"}
                                value={loginFormData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={loginFormData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type={"submit"} disabled={loading}>
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;
