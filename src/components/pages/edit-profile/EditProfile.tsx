import React, {useContext} from 'react';
import TopNavigation from "../../top-navigation/TopNavigation";
import "./EditProfile.css";
import UserContext, {useUser} from "../../../context/UserContext";
import {updatePhotoUrlRequest} from "../../../data/patchRequests";

export const EditProfile: React.FC = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [updateProfileFormData, setUpdateProfileFormData] = React.useState({photo_url: ''});
    const [photoUrl, setPhotoUrl] = React.useState<string>("");

    const { state, dispatch } = useUser();
    //-------------------- Get context api related values : -----------------------
    /*
    * Set user id of currently logged-in user from context api:
    * */
    const contextValue = useContext(UserContext);

    /*
    * Set current user photo url, used as placeholder by input component
    * */
    let userPhotoUrl = "paste photo url here...";
    let userId = "";
    let updatedUser: {};
    if (contextValue?.state?.user) {
        updatedUser = contextValue.state.user;
        if (contextValue.state.user.user_photo) {
            userPhotoUrl = contextValue.state.user.user_photo;
        }
        if (contextValue.state.user.user_id) {
            userId = contextValue.state.user.user_id;
        }
    }
    //-----------------------------------------------------------------------------

    /*
    * On init:
    * */
    React.useEffect(()=> {
        const formattedPhotoUrl = contextValue?.state?.user?.user_photo || "";
        if (formattedPhotoUrl.length > 0) {
            const cleanPhoto = formattedPhotoUrl.slice(1, -1);
            setPhotoUrl(cleanPhoto);
        }
    },[]);

    /*
    * Update user profile picture:
    * */
    const sendUpdateProfilePhotoRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await updatePhotoUrlRequest(userId, updateProfileFormData.photo_url)
            // const cleanPhoto: string = response.user_photo.slice(2, -2);
            const cleanPhoto: string = response.user_photo.replace(/"/g, '');

            if (response) {
                if (response.status === "200") {
                    /*
                    * Set user to context api user state:
                    * */
                    if(response.role_id) {
                        dispatch({
                            type: 'UPDATE_PHOTO',
                            payload: {
                                role_id: response.role_id,
                                username: response.username,
                                user_photo: cleanPhoto,
                                user_id: response.user_id,
                            }
                        });
                    }
                    /*
                    * redirect to chart tree:
                    * */
                } else if (response.status === "401") {
                    console.log("failed to update user photo with 401 request error.")
                }
            }

        } catch (error) {
            console.log("login error:", error);
        }
        setLoading(false);
    }

    /*
    * update state with new photo url address on user input:
    */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUpdateProfileFormData({...updateProfileFormData, [name]: value});
    }

    return (<div className={"editProfileWrapper"}>
        <TopNavigation />
        <span>Edit user profile</span>
        <div className={"profile-photo-wrapper"}>
            <img className={"profile-photo-wrapper"} src={photoUrl} alt={"photo url missing"} />
        </div>
        <form className='login-style' onSubmit={sendUpdateProfilePhotoRequest}>
            <div className='input-wrapper'>
                <label htmlFor={"username"} className='user-name'>New Photo url : </label>
                <input
                    className='input-box input-btn-caption'
                    type={"text"}
                    id={"photo_url_id"}
                    name={"photo_url"}
                    placeholder={userPhotoUrl}
                    onChange={handleInputChange}
                />
            </div>
            <button className='submit-button' type={"submit"} disabled={loading}>
                <span className='submit-btn-caption'>{loading ? 'Saving...' : 'Save'}</span>
            </button>
        </form>
    </div>);
}

export default EditProfile;
