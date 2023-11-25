import './SidebarUserPointsForm.css';
import {UserNodeSimpleInfo} from "../../../../object-types/user-interfaces";
import React from "react";

interface SidebarUserPointsFormProps {
    user: UserNodeSimpleInfo;
    isOpen: boolean;
    setSidebarPointsFormOpenCallback: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SidebarUserPointsForm({user, isOpen, setSidebarPointsFormOpenCallback}: SidebarUserPointsFormProps) {

    return (
        <div className={(isOpen === true) ? "sidebar-points-form-container sidebar-points-form-open" : "sidebar-points-form-container"}>
            <div className={"add-points-form-container"}>
                Add Points Form
                <div className={"form-buttons-container"}>
                    <button className={"add-points-button"} onClick={()=>setSidebarPointsFormOpenCallback(false)}>
                        <div className={"form-item-caption"}>Cancel</div>
                    </button>
                    <button className={"add-points-button"} type="submit">
                        <div className={"form-item-caption"}>Submit</div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SidebarUserPointsForm;
