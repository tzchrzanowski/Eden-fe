import React from 'react';
import {CashOutUserInfo} from "object-types/user-interfaces";
import {setCashOutAmountForUser} from "data/patchRequests";

interface SidebarCashOutFormProps {
    user: CashOutUserInfo;
    isOpen: boolean;
    rerenderCashOutListCallback: React.Dispatch<React.SetStateAction<boolean>>;
    setSidebarCashOutFormOpenCallback: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SidebarCashOutForm({user, isOpen, rerenderCashOutListCallback, setSidebarCashOutFormOpenCallback}: SidebarCashOutFormProps) {
    const [cashOutAmount, setCashOutAmount] = React.useState<Number>(0);
    const [successfulRequest, setSuccessfulRequest] = React.useState<boolean>(false);
    const [unsuccessfulRequest, setUnsuccessfulRequest] = React.useState<boolean>(false);

    React.useEffect(()=> {
        setSuccessfulRequest(false);
        setUnsuccessfulRequest(false);
    }, [user]);

    const handleCashOutAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
        if (value >= 0) {
            setCashOutAmount(value);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await setCashOutAmountForUser(user.user_id, cashOutAmount);
            if (response) {
                if (response === 200) {
                    setSuccessfulRequest(true);
                    rerenderCashOutListCallback(prevState=> !prevState);
                }
            } else {
                setUnsuccessfulRequest(true);
            }
        } catch (error) {
            console.log("Set cash out for user error: ", error);
        }
    };

    return (
        <div className={(isOpen === true) ? "sidebar-monthly-points-form-container sidebar-monthly-points-form-open" : "sidebar-monthly-points-form-container"}>
            <form className={"mt-5 add-monthly-points-form-container"} onSubmit={handleSubmit}>
                <div className={"form-item-caption"}>
                    <span>Cash out of user: <strong>{user.username}</strong></span>
                </div>
                <div className={"mt-2 form-item-caption"}>
                    <span><strong>{user.username}</strong> has total amount of : </span>
                    <strong>{user.money_amount} php</strong>
                </div>
                <label className={"add-points-form-item"}>
                    <div className={"form-item-caption"}>Amount to cash out:</div>
                    <input
                        required={true}
                        className={"form-text-input"}
                        type="number"
                        name="cash-out-amount"
                        value={cashOutAmount.toString()}
                        onChange={handleCashOutAmountChange}
                    />
                </label>
                <div className={"warning-message"}>
                    <span>Warning note:</span><br/>
                    <span>Submitting this form only updates internal tracking of cash out for given user.</span>
                    <span>You still have to perform money transfer for selected user by using external transaction/transfer method.</span>
                </div>
                <div className={"form-buttons-container mt-5"}>
                    <button className={"add-points-button"} type="reset" onClick={()=>setSidebarCashOutFormOpenCallback(false)}>
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
    );
}

export default SidebarCashOutForm;
