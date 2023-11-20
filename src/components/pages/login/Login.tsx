import React, {useContext} from 'react';
import './Login.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import { getAllUsers } from 'data/getRequests';
import VideoSpray from "resources/videos/eden-spray.mp4";
import {loginUser} from "data/postRequests";
import Logo from "resources/images/eden-crest-transparent-white.png"
import {useUser} from 'context/UserContext';
import {useNavigate} from 'react-router-dom';
import LogoGold from "resources/images/logo_gold.jpg";

export function Login() {
    /* ------------------------------------------------
    * Static fields definition:
    * */
    const navigate = useNavigate();
    const { state, dispatch } = useUser();

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
            if (response) {
                if (response.status === "200") {
                    setLoggedIn(true);
                    /*
                    * Set user to context api user state:
                    * */
                    if(response.role_id) {
                        dispatch({
                            type: 'LOGIN',
                            payload: {
                                role_id: response.role_id,
                                username: loginFormData.username,
                                user_photo: response.user_photo,
                                user_id: response.user_id,
                            }
                        });
                    }
                    /*
                    * redirect to chart tree:
                    * */
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
                        <video className={"video-player"} autoPlay loop muted >
                            <source src={VideoSpray} type={"video/mp4"}/>
                        </video>
                    </div>
                </div>
                <div className={"right-container-wrapper"}>
                    <div className={'right-container'}>
                        <img src={LogoGold} alt={"logo"} width={"250px"} />
                        <p className='welcome-design'>Welcome! please login!</p>
                        <form className='login-style' onSubmit={sendLoginRequest}>
                            <div className='input-wrapper'>
                                <label htmlFor={"username"} className='user-name'>Username : </label>
                                <input
                                    className='input-box input-btn-caption'
                                    type={"text"}
                                    id={"username"}
                                    name={"username"}
                                    value={loginFormData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='input-wrapper'>
                                <label htmlFor="password" className='user-pass'>Password : </label>
                                <input
                                    className='input-box'
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={loginFormData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button className='submit-button' type={"submit"} disabled={loading}>
                                <span className='submit-btn-caption'>{loading ? 'Logging in...' : 'Log In'}</span>
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
        </div>
    )
}
export default Login;
