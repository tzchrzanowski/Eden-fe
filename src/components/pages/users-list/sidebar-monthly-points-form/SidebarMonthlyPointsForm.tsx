import './SidebarMonthlyPointsForm.css';
import React from 'react';
import {UserNodeSimpleInfo} from "../../../../object-types/user-interfaces";

interface SidebarMonthlyPointsFormProps {
    user?: UserNodeSimpleInfo;
    isOpen: boolean;
    rerenderListCallback: React.Dispatch<React.SetStateAction<boolean>>;
    setSidebarMonthlyPointsFormOpenCallback: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SidebarMonthlyPointsForm({user, isOpen, rerenderListCallback, setSidebarMonthlyPointsFormOpenCallback}: SidebarMonthlyPointsFormProps) {
    const [usernameValue, setUsernameValue] = React.useState<string>('');
    const [radioValue, setRadioValue] = React.useState<string>('all-users');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Ensure the input value is a positive number or an empty string
        const inputValue = e.target.value;
        if (inputValue) {
            setUsernameValue(inputValue);
        }
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(e.target.value);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }
    return(
        <div className={(isOpen === true) ? "sidebar-monthly-points-form-container sidebar-monthly-points-form-open" : "sidebar-monthly-points-form-container"}>
            <form className={"add-monthly-points-form-container"} onSubmit={handleSubmit}>
                <div className={"form-item-caption"}>
                    Add Monthly Points for:
                </div>
                <div className={"add-points-form-item"}>
                    <label>
                        <input
                            type="radio"
                            name="options"
                            value="all-users"
                            checked={radioValue === 'all-users'}
                            onChange={handleRadioChange}
                        />
                        <span className={"ml-2"}>All users</span>
                    </label>
                </div>
                <div className={"add-points-form-item"}>
                    <label>
                        <input
                            type="radio"
                            name="options"
                            value="single-user"
                            checked={radioValue === 'single-user'}
                            onChange={handleRadioChange}
                        />
                        <span className={"ml-2"}>Single user</span>
                    </label>
                </div>
                {radioValue == 'single-user' &&
                    <label className={"add-points-form-item"}>
                        Username:
                        <input
                            type="text"
                            value={usernameValue}
                            onChange={handleChange}
                        />
                    </label>
                }
                <div className={"form-buttons-container mt-5"}>
                    <button className={"add-points-button"} type="reset" onClick={()=>setSidebarMonthlyPointsFormOpenCallback(false)}>
                        <div className={"form-item-caption"}>Cancel</div>
                    </button>
                    <button className={"add-points-button"} type={"submit"}>
                        <div className={"form-item-caption"}>Submit</div>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SidebarMonthlyPointsForm;

