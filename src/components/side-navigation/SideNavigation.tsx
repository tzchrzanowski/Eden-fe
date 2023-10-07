import React from 'react';
import './SideNavigation.css';
import SideNavCategory from "./side-nav-category/SideNavCategory";

interface SideNavigationProps {
    isOpen?: boolean,
    setSideNavigationOpenCallback?: React.Dispatch<React.SetStateAction<boolean>>;
}

const sideNavButtons = [
    "Login",
    "Category 1",
    "Category 1",
    "Category 1",
    "Category 1",
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
                  return <SideNavCategory categoryName={category} key={id}/>
              })}
          </div>
      </>
    );
}

export default SideNavigation;
