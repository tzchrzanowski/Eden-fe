import React, {useContext} from 'react';
import './SideNavigation.css';
import SideNavCategory from "./side-nav-category/SideNavCategory";
import accountsIcon from "resources/side-nav-icons/accounts-icon.svg";
import logoutIcon from "resources/side-nav-icons/logout-icon.svg";
import maintenanceIcon from "resources/side-nav-icons/maintenance-icon.svg";
import networkIcon from "resources/side-nav-icons/network-icon.svg";
import UserContext, {useUser} from 'context/UserContext';
import {logoutUser} from "../../data/postRequests";
import {useNavigate} from 'react-router-dom';

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
        caption: "Ways to Earn",
        buttonId: "ways-to-earn-id",
    },
    {
        iconSrc: accountsIcon,
        caption: "Network",
        buttonId: "network-id",
    },
    {
        iconSrc: accountsIcon,
        caption: "Users List",
        buttonId: "users-list-id",
    },
    {
        iconSrc: maintenanceIcon,
        caption: "Edit Profile",
        buttonId: "edit-profile-id",
    },
    {
        iconSrc: logoutIcon,
        caption: "LOG OUT",
        buttonId: "logout-id",
    },
]

export function SideNavigation({isOpen, setSideNavigationOpenCallback}: SideNavigationProps) {
    const navigate = useNavigate();
    const { state, dispatch } = useUser();
    const contextValue = useContext(UserContext);

    const closeSideNavigation = (bool: boolean) => {
        if(setSideNavigationOpenCallback) {
            setSideNavigationOpenCallback(prevState => {
                return bool
            })
        }
    };

    const onSideNavClickEvent = (buttonId: String) => {
        switch (buttonId) {
            case "logout-id":
                sendLogoutRequest();
                break;
            case "edit-profile-id":
                navigate("/edit-profile");
                break;
            case "ways-to-earn-id":
                navigate("/ways-to-earn");
                break;
            case "network-id":
                navigate("/network-chart");
                break;
            case "users-list-id":
                navigate("/users-list");
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
                        navigate("/");
                    }
                } else if (response.status === "401") {
                    console.log("user logged out.");
                }
            }
        } catch (error) {
            console.log("login error:", error);
        }
    };

    const getUsersRoleId = (): string => {
        if (contextValue &&
            contextValue.state &&
            contextValue.state.user &&
            contextValue.state.user.role_id
        ) {
            return contextValue.state.user.role_id;
        }
        return "";
    }

    return (
      <>
          <div
              className={(isOpen === true) ? "sideNavigation sideNavigationOpen" : "sideNavigation"}
              onMouseLeave={()=> {closeSideNavigation(false)}}
          >
              {sideNavButtons && sideNavButtons.map((category, id) => {
                  switch (category.buttonId) {
                      case "network-id":
                          if (getUsersRoleId() == "1" || getUsersRoleId() == "2") {
                              return <SideNavCategory key={id} onClickCallback={onSideNavClickEvent} category={category} />
                          }
                          break;
                      case "users-list-id":
                          if (getUsersRoleId() == "1" || getUsersRoleId() == "3") {
                              return <SideNavCategory key={id} onClickCallback={onSideNavClickEvent} category={category} />
                          }
                          break;
                      default:
                          return <SideNavCategory key={id} onClickCallback={onSideNavClickEvent} category={category} />
                  }
              })}
          </div>
      </>
    );
}

export default SideNavigation;
