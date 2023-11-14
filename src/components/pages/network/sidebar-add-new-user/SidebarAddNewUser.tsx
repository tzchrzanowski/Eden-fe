import React from 'react';
import './SidebarAddNewUser.css';

interface SidebarAddNewUserProps {
    isOpen: boolean,
    setSidebarAddNewUserOpenCallback: React.Dispatch<React.SetStateAction<boolean>>;
    parentNodeId: number,
}

interface UserObject {
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    parent: number,
}

export function SidebarAddNewUser({isOpen, setSidebarAddNewUserOpenCallback, parentNodeId}: SidebarAddNewUserProps) {
    const [formData, setFormData] = React.useState<UserObject>({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        parent: parentNodeId,
    });

    /*
    * Update clicked parent node id whenever it changes:
    * */
    React.useEffect(()=> {
        setFormData({
            ...formData,
            parent: parentNodeId,
        })
    }, [parentNodeId])

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
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("handle submit sidebar form triggered..", formData);
    };
    return (
        <>
            <div className={(isOpen === true) ? "side-bar-container sidebar-open" : "side-bar-container"}>
                <form className={"add-user-form-container"} onSubmit={handleSubmit}>
                    <label className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Username:</div>
                        <input className={"form-text-input"} type="text" name="username" value={formData.username} onChange={handleChange} />
                    </label>
                    <label className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Email:</div>
                        <input className={"form-text-input"} type="text" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <label className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>First Name:</div>
                        <input className={"form-text-input"} type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                    </label>
                    <label className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Last Name:</div>
                        <input className={"form-text-input"} type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
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
