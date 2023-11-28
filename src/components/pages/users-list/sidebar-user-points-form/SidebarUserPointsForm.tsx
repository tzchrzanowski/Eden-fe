import './SidebarUserPointsForm.css';
import {UserNodeSimpleInfo, UserObject} from "../../../../object-types/user-interfaces";
import React from "react";
import {addPointsToUser} from "data/patchRequests";

interface SidebarUserPointsFormProps {
    user: UserNodeSimpleInfo;
    isOpen: boolean;
    rerenderListCallback: React.Dispatch<React.SetStateAction<boolean>>;
    setSidebarPointsFormOpenCallback: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SidebarUserPointsForm({user, isOpen, setSidebarPointsFormOpenCallback, rerenderListCallback}: SidebarUserPointsFormProps) {
    const [pointsValue, setPointsValue] = React.useState<number>(0);
    const [successfullyAddedPoints, setSuccessfullyAddedPoints] = React.useState<boolean>(false);
    const [unsuccessfullyAddedPoints, setUnsuccessfullyAddedPoints] = React.useState<boolean>(false);

    React.useEffect(()=>{
        setSuccessfullyAddedPoints(false);
        setUnsuccessfullyAddedPoints(false);
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
        if (value >= 0) {
            setPointsValue(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (pointsValue > 0) {
            try {
                const response = await addPointsToUser(user.user_id, pointsValue);
                if (response) {
                    if (response === 200) {
                        setSuccessfullyAddedPoints(true);
                        rerenderListCallback(prevState=> !prevState);
                    } else {
                        setUnsuccessfullyAddedPoints(true);
                    }
                }
            } catch (error) {
                console.log("Add points to user error: ", error);
            }
        }
    };

    return (
        <div className={(isOpen === true) ? "sidebar-points-form-container sidebar-points-form-open" : "sidebar-points-form-container"}>
            <form className={"add-points-form-container"} onSubmit={handleSubmit}>
                <div className={"form-item-caption"}>
                    Add points to <strong>{user.username}</strong>'s Account:
                </div>
                <label className={"add-points-form-item"}>
                    <div className={"form-item-caption"}>Add Points Amount:</div>
                    <input
                        required={true}
                        className={"form-text-input"}
                        type="number"
                        name="add-points-amount" value={pointsValue}
                        onChange={handleChange}
                    />
                </label>
                <div className={"form-buttons-container"}>
                    <button className={"add-points-button"} type="reset" onClick={()=>setSidebarPointsFormOpenCallback(false)}>
                        <div className={"form-item-caption"}>Cancel</div>
                    </button>
                    <button className={"add-points-button"} type={"submit"}>
                        <div className={"form-item-caption"}>Submit</div>
                    </button>
                </div>
                {
                    successfullyAddedPoints && (<div className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Successfully added points to <strong>{user.username}</strong>'s account.</div>
                    </div>)
                }
                {
                    unsuccessfullyAddedPoints && (<div className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Unsuccessful attempt to add points to <strong>{user.username}</strong>'s account.</div>
                    </div>)
                }
            </form>
        </div>
    );
}

export default SidebarUserPointsForm;
