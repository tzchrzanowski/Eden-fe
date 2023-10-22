import React from 'react';
import './Login.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import { getAllUsers } from 'data/getRequests';
import VideoSpray from "resources/videos/eden-spray.mp4";
import {loginUser} from "data/postRequests";
import Logo from "resources/images/eden-crest-transparent-white.png"
import {useNavigate} from 'react-router-dom';

export function Login() {
    /* ------------------------------------------------
    * Static fields definition:
    * */
    const navigate = useNavigate();

    const [users, setUsers] = React.useState<any>();
    const [dataFetched, setDataFetched] = React.useState<boolean>(false);
    const [loginFormData, setLoginFormData] = React.useState({username: '', password: ''});
    const [loading, setLoading] = React.useState<boolean>(false);
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
    const [attemptedLogin, setAttemptedLogin] = React.useState<boolean>(false);
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
        setAttemptedLogin(true);
        try {
            const response = await loginUser(loginFormData.username, loginFormData.password)
            console.log("response: ", response);
            if (response) {
                if (response.status === "200") {
                    setLoggedIn(true);
                    navigate('/network-chart');
                } else if (response.status === "401") {
                    setLoggedIn(false);
                }
            }
        } catch (error) {
            console.log("login error:", error);
            setLoggedIn(false);
        }
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
                    {attemptedLogin ? (
                        <>
                            {loggedIn ?
                                (
                                    <div>Login success</div>
                                ) : (
                                    <div>Login failed...</div>
                                )
                            }
                        </>
                    ) : (
                            <></>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Login;
