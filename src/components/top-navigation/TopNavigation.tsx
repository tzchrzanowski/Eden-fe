import React, { useContext } from 'react';
import './TopNavigation.css';
import { Link } from "react-router-dom";
import SideNavigation from "../side-navigation/SideNavigation";
import UserContext from 'context/UserContext';
import logoNoBg from 'resources/images/logo_no_bg.png';
import hamburgerMenuIcon from 'resources/top-menu-icons/hamburger-menu-icon.svg';

interface buttonsInterface {
    route: string,
    caption: string
    public: boolean
};

const buttons: buttonsInterface[] = [
    {route: "/", caption: "Home", public: true},
    {route: "/about", caption: "About", public: true},
    {route: "/products", caption: "Products", public: true},
    {route: "/contact", caption: "Contact", public: true},
    {route: "/login", caption: "Login", public: true},
]

export function TopNavigation() {
    const [hoveredButtons, setHoveredButtons] = React.useState<boolean[]>(Array(buttons.length).fill(false));
    const [isSideNavOpen, setSideNavOpen] = React.useState(false);
    const [isleLeftSideMenuVisible, setIsleLeftSideMenuVisible] = React.useState<boolean>(false);
    const [roleUpdated, setRoleUpdated] = React.useState<boolean>(false);
    const contextValue = useContext(UserContext);

    /*
    * Re-render top-navigation if role_id in context was updated
    * */
    React.useEffect(()=>{
        console.log("re-render top navigation...", contextValue);
    }, [roleUpdated]);

    /*
    * If user context contains role_id field, then set trigger for re-render
    * */
    React.useEffect(()=>{
        if (contextValue &&
            contextValue.state &&
            contextValue.state.user &&
            contextValue.state.user.role_id
        ) {
            setRoleUpdated(prevState => !prevState);
        }
    }, [contextValue]);

    const handleHover = (index: number, setter: boolean) => {
        const newHoveredButtons = [...hoveredButtons];
        newHoveredButtons[index] = setter;
        setHoveredButtons(newHoveredButtons);
    };

    /*
    * Display field if is public by default,
    * If field is not public, should be displayed only if user_id type is 1 or 2
    * */
    const canDisplay = (isPublic: boolean): boolean => {
        if (isPublic == false) {
            if (contextValue &&
                contextValue.state &&
                contextValue.state.user &&
                contextValue.state.user.role_id
            ) {
                const currentUserRoleId = contextValue.state.user.role_id;
                // @ts-ignore
                return ( currentUserRoleId === '1' || currentUserRoleId === '2' || currentUserRoleId === '3' || currentUserRoleId === 1 || currentUserRoleId === 2 || currentUserRoleId === 3 ) ?? true;
            } else {
                return false;
            }
        }
        return true;
    }

    /*
    * opens and closes left side menu that replaces top-navigation menu on small screen device:
    * */
    const handleLeftSideMenu = ()=> {
        setIsleLeftSideMenuVisible(prevState => !prevState);
    }

    return (
        <>
            {/* right-side menu: */}
            <SideNavigation
                isOpen={isSideNavOpen}
                setSideNavigationOpenCallback={setSideNavOpen}
            />
            {/* left-side nav menu: */}
            <div className={isleLeftSideMenuVisible ? "left-side-menu-container left-side-menu-open" : "left-side-menu-container"}>
                {buttons && buttons.map((button, id) => {
                    const leftId = id+1;
                    if (canDisplay(button.public)) {
                        return <Link className={"left-side-link"} to={button.route} key={leftId}>
                            <div
                                className={(hoveredButtons[leftId] ? "isHovered button-box" : "button-box")}
                                onMouseOver={() => handleHover(leftId, true)}
                                onMouseLeave={() => handleHover(leftId, false)}
                            >
                                <span className={"top-nav-btn-caption"}>{button.caption}</span>
                            </div>
                        </Link>
                    }
                })}
            </div>
            <div className={"nav-container"}>
                <div className={"buttons-container"}>
                    <div className={"button-container"} >
                        <img className={"logo-img"} src={logoNoBg} alt={"logo"} />
                    </div>
                    <div className={"button-container hamburger-container"} onClick={handleLeftSideMenu} >
                        <img className={"hamburger-menu-icon"} src={hamburgerMenuIcon} alt={"menu"}/>
                    </div>
                    {/* ------------------ top nav meno buttons : ------------------------------------------*/}
                    {buttons && buttons.map((button, id) => {
                        if (canDisplay(button.public)) {
                            return <Link className={"top-nav-button"} to={button.route} key={id}>
                                <div
                                    className={(hoveredButtons[id] ? "isHovered button-box button-box-top" : "button-box button-box-top")}
                                    onMouseOver={() => handleHover(id, true)}
                                    onMouseLeave={() => handleHover(id, false)}
                                >
                                    <span className={"top-nav-btn-caption"}>{button.caption}</span>
                                </div>
                            </Link>
                        }
                    })}
                    {/*------------------------------------------------------------------------------------*/}
                </div>
                <div className={"menu-container"}>
                    {
                        canDisplay(false) &&
                        (<div
                            className={"button-box button-box-top"}
                            onClick={()=> setSideNavOpen((prevState) => !prevState)}
                        >{"MENU"}</div>)
                    }
                </div>
            </div>
        </>

    )
}

export default TopNavigation;
