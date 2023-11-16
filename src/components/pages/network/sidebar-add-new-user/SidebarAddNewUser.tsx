import React from 'react';
import './SidebarAddNewUser.css';
import {ParentNodeInfo, UserObject} from "object-types/user-interfaces";
import 'App.css';
import {addNewPackageUser, loginUser} from "data/postRequests";

interface SidebarAddNewUserProps {
    isOpen: boolean,
    setSidebarAddNewUserOpenCallback: React.Dispatch<React.SetStateAction<boolean>>;
    parentNodeInfo: ParentNodeInfo
}

export function SidebarAddNewUser({isOpen, setSidebarAddNewUserOpenCallback, parentNodeInfo}: SidebarAddNewUserProps) {
    const [formData, setFormData] = React.useState<UserObject>({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        parent: parentNodeInfo.parentId,
    });

    /*
    * Update clicked parent node id whenever it changes:
    * */
    React.useEffect(()=> {
        setFormData({
            ...formData,
            parent: parentNodeInfo.parentId,
        })
    }, [parentNodeInfo])

    /*
    * On form input change values
    * */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    /*
    * TODO: add endpoint request
    * */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("handle submit sidebar form triggered..", formData);

        try {
            const response = await addNewPackageUser(formData);
            if (response) {
                if (response.status === "200") {
                    // setLoggedIn(true);
                    /*
                    * Set user to context api user state:
                    * */
                    console.log("response from sidebar: ", response);
                } else if (response.status === "401") {
                    // setLoggedIn(false);
                }
            }
        } catch (error) {
            console.log("login error:", error);
            // setLoggedIn(false);
        }
    };

    return (
        <>
            <div className={(isOpen === true) ? "side-bar-container sidebar-open" : "side-bar-container"}>
                <form className={"add-user-form-container"} onSubmit={handleSubmit}>
                    <div className={"form-item-caption"}>Add Package Account under: </div>
                    <div className={"form-item-caption mt-1 fb justify-center"}>
                        <strong>{parentNodeInfo.parentUsername}</strong>
                    </div>
                    <label className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Username:</div>
                        <input required={true} className={"form-text-input"} type="text" name="username" value={formData.username} onChange={handleChange} />
                    </label>
                    <label className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Email:</div>
                        <input required={true} className={"form-text-input"} type="text" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <label className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>First Name:</div>
                        <input required={true} className={"form-text-input"} type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                    </label>
                    <label className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Last Name:</div>
                        <input required={true} className={"form-text-input"} type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                    </label>
                    <div className={"form-buttons-container"}>
                        <button className={"add-user-button"} onClick={()=>setSidebarAddNewUserOpenCallback(false)}>
                            <div className={"form-item-caption"}>Cancel</div>
                        </button>
                        <button className={"add-user-button"} type="submit">
                            <div className={"form-item-caption"}>Submit</div>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
};

export default SidebarAddNewUser;
