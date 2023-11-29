import React from 'react';
import './SidebarAddNewUser.css';
import {ParentNodeInfo, UserObject} from "object-types/user-interfaces";
import 'App.css';
import {addNewPackageUser, loginUser} from "data/postRequests";

interface SidebarAddNewUserProps {
    isOpen: boolean,
    setSidebarAddNewUserOpenCallback: React.Dispatch<React.SetStateAction<boolean>>;
    parentNodeInfo: ParentNodeInfo
    rerenderCallback: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SidebarAddNewUser({isOpen, setSidebarAddNewUserOpenCallback, parentNodeInfo, rerenderCallback}: SidebarAddNewUserProps) {
    const [formData, setFormData] = React.useState<UserObject>({
        direct_referral: '',
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        parent: parentNodeInfo.parentId,
        package: ''
    });
    const [successfullyAddedUser, setSuccessfullyAddedUser] = React.useState<boolean>(false);
    const [unsuccessfulAddUserCall, setUnsuccessfulAddUserCall] = React.useState<boolean>(false);
    const [selectedPackage, setSelectedPackage] = React.useState<string>('');

    /*
    * Update clicked parent node id whenever it changes:
    * */
    React.useEffect(()=> {
        setFormData({
            ...formData,
            parent: parentNodeInfo.parentId,
        })
    }, [parentNodeInfo]);

    /*
    * Update tree when successfully added user:
    * */
    React.useEffect(()=> {}, [successfullyAddedUser, unsuccessfulAddUserCall]);

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
    * Sends add new user request
    * */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await addNewPackageUser({
                ...formData,
                package: selectedPackage,
            });
            if (response) {
                if (response.status === 200) {
                    setSuccessfullyAddedUser(true);
                    rerenderCallback((prevState: boolean) => !prevState);
                } else {
                    setUnsuccessfulAddUserCall(true);
                }
            }
        } catch (error) {
            console.log("Add new package error:", error);
            // setLoggedIn(false);
        }
    };

    return (
        <>
            <div className={(isOpen === true) ? "side-bar-container sidebar-open" : "side-bar-container"}>
                <form className={"mt-5 add-user-form-container"} onSubmit={handleSubmit}>
                    <div className={"form-item-caption"}>Add Package Account under: </div>
                    <div className={"form-item-caption mt-1 fb justify-center"}>
                        <strong>{parentNodeInfo.parentUsername}</strong>
                    </div>
                    <label className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Direct referral username:</div>
                        <input required={true} className={"form-text-input"} type="text" name="direct_referral" value={formData.direct_referral} onChange={handleChange} />
                    </label>
                    <label className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Username:</div>
                        <input required={true} className={"form-text-input"} type="text" name="username" value={formData.username} onChange={handleChange} />
                    </label>
                    <label className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Select Package:</div>
                        <select
                            required={true}
                            className={"form-text-input"}
                            name="package"
                            value={selectedPackage}
                            onChange={(e) => setSelectedPackage(e.target.value)}
                        >
                            <option value="">Select a package</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                            <option value="Diamond">Diamond</option>
                        </select>
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
                        <button className={"add-user-button"} type={"reset"} onClick={()=>setSidebarAddNewUserOpenCallback(false)}>
                            <div className={"form-item-caption"}>Cancel</div>
                        </button>
                        <button className={"add-user-button"} type={"submit"}>
                            <div className={"form-item-caption"}>Submit</div>
                        </button>
                    </div>
                    {
                        successfullyAddedUser && (<div className={"add-user-form-item"}>
                            <div className={"form-item-caption"}>Successfully added user to the database</div>
                        </div>)
                    }
                    {
                        unsuccessfulAddUserCall && (<div className={"add-user-form-item"}>
                            <div className={"form-item-caption"}>Unsuccessful attempt to add user to the database</div>
                        </div>)
                    }
                </form>
            </div>
        </>
    )
};

export default SidebarAddNewUser;
