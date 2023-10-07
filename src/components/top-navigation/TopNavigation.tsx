import React from 'react';
import './TopNavigation.css';
import { Link } from "react-router-dom";
import SideNavigation from "../side-navigation/SideNavigation";


interface buttonsInterface {
    route: string,
    caption: string
};

const buttons: buttonsInterface[] = [
    {route: "/", caption: "Home"},
    {route: "/ways-to-earn", caption: "Ways to earn"},
    {route: "/products", caption: "Products"},
    {route: "/contact", caption: "Contact"},
    {route: "/network-chart", caption: "Network"},
    {route: "/login", caption: "Login"},
]

export function TopNavigation() {
    const [hoveredButtons, setHoveredButtons] = React.useState<boolean[]>(Array(buttons.length).fill(false));
    const [isSideNavOpen, setSideNavOpen] = React.useState(false);


    const handleHover = (index: number, setter: boolean) => {
        const newHoveredButtons = [...hoveredButtons];
        newHoveredButtons[index] = setter;
        setHoveredButtons(newHoveredButtons);
    };

    return (
        <>
            <SideNavigation
                isOpen={isSideNavOpen}
                setSideNavigationOpenCallback={setSideNavOpen}
            />
            <div className={"nav-container"}>
                {buttons && buttons.map((button, id) => {
                    return <Link to={button.route} key={id}>
                        <div
                            className={(hoveredButtons[id] ? "isHovered button-box" : "button-box")}
                            onMouseOver={() => handleHover(id, true)}
                            onMouseLeave={() => handleHover(id, false)}
                        >
                            {button.caption}
                        </div>
                    </Link>
                })}
                <div
                    className={"button-box"}
                    onClick={()=> setSideNavOpen((prevState) => !prevState)}
                >{"MENU"}</div>
            </div>
        </>

    )
}

export default TopNavigation;
