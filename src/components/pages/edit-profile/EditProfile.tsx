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
    * When photo url is updates in context
    * */
    React.useEffect(()=> {
        if (state?.user?.user_photo) {
            const cleanPhoto: string = state.user.user_photo.replace(/"/g, '');
            setPhotoUrl(cleanPhoto);
        }
    }, [state.user?.user_photo])


    /*
    * Update user profile picture:
    * */
    const sendUpdateProfilePhotoRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updatePhotoUrlRequest(userId, updateProfileFormData.photo_url).then((res)=> {
                if (res.role_id == 1 || res.role_id == 2) {
                    dispatch({
                        type: 'UPDATE_PHOTO',
                        payload: {
                            role_id: res.role_id,
                            username: res.username,
                            user_photo: res.profile_picture_url,
                            user_id: res.id,
                        }
                    });
                }
            });


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
