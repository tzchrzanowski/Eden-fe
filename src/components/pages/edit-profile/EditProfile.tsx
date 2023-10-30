import React from 'react';
import TopNavigation from "../../top-navigation/TopNavigation";
import "./EditProfile.css";

export const EditProfile: React.FC = () => {

    /*
    * Update user profile picture:
    * */
    const sendUpdateProfilePhotoRequest = async (e: React.FormEvent) => {
        e.preventDefault();

    }

    return (<div className={"editProfileWrapper"}>
        <TopNavigation />
        Edit user profile

        <form className='login-style' onSubmit={sendUpdateProfilePhotoRequest}>

        </form>
    </div>);
}

export default EditProfile;
