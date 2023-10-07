import React from 'react';
import './SideNavigation.css';
import SideNavCategory from "./side-nav-category/SideNavCategory";
import accountsIcon from "resources/side-nav-icons/accounts-icon.svg";
import addAccountIcon from "resources/side-nav-icons/add-account-icon.svg";
import addRetailerIcon from "resources/side-nav-icons/add-retailer-icon.svg";
import logoutIcon from "resources/side-nav-icons/logout-icon.svg";
import maintenanceIcon from "resources/side-nav-icons/maintenance-icon.svg";
import networkIcon from "resources/side-nav-icons/network-icon.svg";

interface SideNavigationProps {
    isOpen?: boolean,
    setSideNavigationOpenCallback?: React.Dispatch<React.SetStateAction<boolean>>;
}

const sideNavButtons = [
    {
        "iconSrc": networkIcon,
        caption: "Distributors",
    },
    {
        "iconSrc": addAccountIcon,
        caption: "Add Account",
    },
    {
        "iconSrc": addRetailerIcon,
        caption: "Add Retailer",
    },
    {
        "iconSrc": accountsIcon,
        caption: "Retailers",
    },
    {
        "iconSrc": maintenanceIcon,
        caption: "Maintenance",
    },
    {
        "iconSrc": logoutIcon,
        caption: "LOG OUT",
    },
]

export function SideNavigation({isOpen, setSideNavigationOpenCallback}: SideNavigationProps) {
    const closeSideNavigation = (bool: boolean) => {
        if(setSideNavigationOpenCallback) {
            setSideNavigationOpenCallback(prevState => {
                return bool
            })
        }
    };

    return (
      <>
          <div
              className={(isOpen === true) ? "sideNavigation sideNavigationOpen" : "sideNavigation"}
              onMouseLeave={()=> {closeSideNavigation(false)}}
          >
              {sideNavButtons && sideNavButtons.map((category, id) => {
                  return <SideNavCategory categoryName={category.caption} key={id} icon={category.iconSrc}/>
              })}
          </div>
      </>
    );
}

export default SideNavigation;
