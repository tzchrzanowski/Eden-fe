import React from 'react';
import './SideNavigation.css';
import SideNavCategory from "./side-nav-category/SideNavCategory";
import accountsIcon from "resources/side-nav-icons/accounts-icon.svg";
import addAccountIcon from "resources/side-nav-icons/add-account-icon.svg";
import addRetailerIcon from "resources/side-nav-icons/add-retailer-icon.svg";
import logoutIcon from "resources/side-nav-icons/logout-icon.svg";
import maintenanceIcon from "resources/side-nav-icons/maintenance-icon.svg";
import networkIcon from "resources/side-nav-icons/network-icon.svg";
import {useUser} from 'context/UserContext';
import {logoutUser} from "../../data/postRequests";

interface SideNavigationProps {
    isOpen?: boolean,
    setSideNavigationOpenCallback?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ButtonsCategory {
    iconSrc: string,
    caption: string,
    buttonId: string,
}

const sideNavButtons: ButtonsCategory[] = [
    {
        iconSrc: networkIcon,
        caption: "Distributors",
        buttonId: "distributors-id",
    },
    {
        iconSrc: addAccountIcon,
        caption: "Add Account",
        buttonId: "add-account-id",
    },
    {
        iconSrc: addRetailerIcon,
        caption: "Add Retailer",
        buttonId: "add-retailer-id",
    },
    {
        iconSrc: accountsIcon,
        caption: "Retailers",
        buttonId: "retailers-id",
    },
    {
        iconSrc: maintenanceIcon,
        caption: "Maintenance",
        buttonId: "maintenance-id",
    },
    {
        iconSrc: logoutIcon,
        caption: "LOG OUT",
        buttonId: "logout-id",
    },
]

export function SideNavigation({isOpen, setSideNavigationOpenCallback}: SideNavigationProps) {
    const { state, dispatch } = useUser();


    const closeSideNavigation = (bool: boolean) => {
        if(setSideNavigationOpenCallback) {
            setSideNavigationOpenCallback(prevState => {
                return bool
            })
        }
    };

    const onSideNavClickEvent = (buttonId: String) => {
        if (buttonId == "logout-id") {
            sendLogoutRequest();
        }
    }

    /*
    * Logout user and Store empty authentication token into local storage:
    * */
    const sendLogoutRequest = async () => {
        try {
            const response = await logoutUser();
            if (response) {
                if (response.status === "200") {
                    /*
                    * Set logout to context api user state:
                    * */
                    if(response.role_id) {
                        dispatch({ type: 'LOGOUT'});
                    }
                } else if (response.status === "401") {
                    console.log("user logged out.");
                }
            }
        } catch (error) {
            console.log("login error:", error);
        }
    };

    return (
      <>
          <div
              className={(isOpen === true) ? "sideNavigation sideNavigationOpen" : "sideNavigation"}
              onMouseLeave={()=> {closeSideNavigation(false)}}
          >
              {sideNavButtons && sideNavButtons.map((category, id) => {
                  return <SideNavCategory onClickCallback={onSideNavClickEvent} category={category} />
              })}
          </div>
      </>
    );
}

export default SideNavigation;
