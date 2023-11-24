import React from 'react';
import './Login.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import VideoSpray from "resources/videos/eden-spray.mp4";
import {loginUser} from "data/postRequests";
import {useUser} from 'context/UserContext';
import {useNavigate} from 'react-router-dom';
import LogoGold from "resources/images/logo_gold.jpg";

export function Login() {
    /* ------------------------------------------------
    * Static fields definition:
    * */
    const navigate = useNavigate();
    const { state, dispatch } = useUser();

    const [loginFormData, setLoginFormData] = React.useState({username: '', password: ''});
    const [loading, setLoading] = React.useState<boolean>(false);
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
    const [attemptedLogin, setAttemptedLogin] = React.useState<boolean>(false);

    /*
    * update state with login credentials on user input:
    */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginFormData({...loginFormData, [name]: value});
    }

    /*
    * Redirect to different page, based on user type, 3 means accountant, 1-2 means user
    * */
    const redirectToPage = (roleId: string) => {
        if (roleId === '3') {
            navigate('/');
        } else {
            navigate('/network-chart');
        }
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
                    * redirect after successful login:
                    * */
                    redirectToPage(response.role_id);
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
