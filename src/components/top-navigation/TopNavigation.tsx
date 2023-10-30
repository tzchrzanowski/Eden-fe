import React, { useContext } from 'react';
import './TopNavigation.css';
import { Link } from "react-router-dom";
import SideNavigation from "../side-navigation/SideNavigation";
import UserContext from 'context/UserContext';

interface buttonsInterface {
    route: string,
    caption: string
    public: boolean
};

const buttons: buttonsInterface[] = [
    {route: "/", caption: "Home", public: true},
    {route: "/ways-to-earn", caption: "Ways to earn", public: true},
    {route: "/products", caption: "Products", public: true},
    {route: "/contact", caption: "Contact", public: true},
    {route: "/network-chart", caption: "Network", public: false},
    {route: "/login", caption: "Login", public: true},
]

export function TopNavigation() {
    const [hoveredButtons, setHoveredButtons] = React.useState<boolean[]>(Array(buttons.length).fill(false));
    const [isSideNavOpen, setSideNavOpen] = React.useState(false);

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
                return (currentUserRoleId === '1' || currentUserRoleId === '2') ?? true;
            } else {
                return false;
            }
        }
        return true;
    }

    return (
        <>
            <SideNavigation
                isOpen={isSideNavOpen}
                setSideNavigationOpenCallback={setSideNavOpen}
            />
            <div className={"nav-container"}>
                {buttons && buttons.map((button, id) => {
                    if (canDisplay(button.public)) {
                        return <Link to={button.route} key={id}>
                            <div
                                className={(hoveredButtons[id] ? "isHovered button-box" : "button-box")}
                                onMouseOver={() => handleHover(id, true)}
                                onMouseLeave={() => handleHover(id, false)}
                            >
                                {button.caption}
                            </div>
                        </Link>
                    }
                })}
                {
                    canDisplay(false) &&
                    (<div
                        className={"button-box"}
                        onClick={()=> setSideNavOpen((prevState) => !prevState)}
                    >{"MENU"}</div>)
                }
            </div>
        </>

    )
}

export default TopNavigation;
