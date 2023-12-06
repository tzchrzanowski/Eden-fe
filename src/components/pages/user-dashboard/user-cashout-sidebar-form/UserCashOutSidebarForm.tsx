import React from 'react';
import {UserInterface} from "../../../../object-types/user-interfaces";
import {setCashOutByUser} from "../../../../data/patchRequests";


interface UserCashOutSidebarFormProps {
    user: UserInterface;
    isOpen: boolean;
    rerenderDashboard: React.Dispatch<React.SetStateAction<boolean>>;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function UserCashOutSidebarForm({user, isOpen, setSidebarOpen, rerenderDashboard}: UserCashOutSidebarFormProps) {
    const [successfulRequest, setSuccessfulRequest] = React.useState<boolean>(false);
    const [unsuccessfulRequest, setUnsuccessfulRequest] = React.useState<boolean>(false);
    const [radioValue, setRadioValue] = React.useState<string>('bank-transfer');
    const [cashOutDetails, setCashOutDetails] = React.useState<string>('');

    React.useEffect(()=>{}, [successfulRequest, unsuccessfulRequest]);

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCashOutDetails(e.target.value);
    };

    const handleClose = (clearDetails?: boolean) => {
        if (clearDetails) {
            setCashOutDetails('')
        }
        setSuccessfulRequest(false);
        setUnsuccessfulRequest(false);
        setRadioValue('bank-transfer');
        setSidebarOpen(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await setCashOutByUser(user.id, cashOutDetails);
            if (response == 200 || response == "200") {
                setSuccessfulRequest(true);
                rerenderDashboard(prevState => !prevState);
            }
        } catch (error) {
            console.log("Set cash out by user error: ", error);
        }
    }

    return (
        <div className={(isOpen === true) ? "sidebar-monthly-points-form-container sidebar-monthly-points-form-open" : "sidebar-monthly-points-form-container"}>
            <form className={"mt-5 add-monthly-points-form-container"} onSubmit={handleSubmit}>
                <div className={"form-item-caption"}>
                    Cash out form:
                </div>
                <div className={"add-points-form-item"}>
                    <label>
                        <input
                            type="radio"
                            name="options"
                            value="bank-transfer"
                            checked={radioValue === 'bank-transfer'}
                            onChange={handleRadioChange}
                        />
                        <span className={"ml-2"}>Bank Transfer</span>
                    </label>
                </div>
                <div className={"add-points-form-item"}>
                    <label>
                        <input
                            type="radio"
                            name="options"
                            value="cash"
                            checked={radioValue === 'cash'}
                            onChange={handleRadioChange}
                        />
                        <span className={"ml-2"}>In Cash</span>
                    </label>
                </div>
                <div className={"warning-message"}>
                    {radioValue == 'bank-transfer' &&
                        <span>By selecting "Bank Transfer" option, provide bank account number and other account details.</span>
                    }
                    {radioValue == 'cash' &&
                        <span>By selecting "Cash" option, accountant will prepare your funds to be collected in person.</span>
                    }
                </div>
                {radioValue == 'bank-transfer' &&
                    <label className={"add-points-form-item"}>
                        <div className={"form-item-caption"}>Bank Transfer Details:</div>
                        <textarea
                            value={cashOutDetails}
                            onChange={handleChange}
                            rows={4}
                            cols={50}
                        />
                    </label>
                }
                <div className={"warning-message"}>
                    <span>Warning note:</span><br/>
                    <span>By submitting this form You will inform an accountant that You want to cash out your funds.</span><br/><br/>
                </div>
                <div className={"form-buttons-container mt-5"}>
                    <button className={"add-points-button"} type="reset" onClick={()=>handleClose(true)}>
                        <div className={"form-item-caption"}>Cancel</div>
                    </button>
                    <button className={"add-points-button"} type={"submit"}>
                        <div className={"form-item-caption"}>Submit</div>
                    </button>
                </div>
                {
                    successfulRequest && (<div className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Successfully set cash out.</div>
                    </div>)
                }
                {
                    unsuccessfulRequest && (<div className={"add-user-form-item"}>
                        <div className={"form-item-caption"}>Unsuccessful attempt to set cash out.</div>
                    </div>)
                }
            </form>
        </div>
    )
}

export default UserCashOutSidebarForm;
