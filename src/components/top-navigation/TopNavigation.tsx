import React from 'react';
import './TopNavigation.css';


interface buttonsInterface {
    route: string,
    caption: string
};

const buttons: buttonsInterface[] = [
    {route: "/", caption: "home"},
    {route: "/ways-to-earn", caption: "Ways to earn"},
    {route: "/products", caption: "Products"},
    {route: "/constact", caption: "Contact"},
    {route: "/network-chart", caption: "Network"},
    {route: "/login", caption: "Login"},
]

export function TopNavigation() {
    const [hoveredButtons, setHoveredButtons] = React.useState<boolean[]>(Array(buttons.length).fill(false));

    const handleHover = (index: number, setter: boolean) => {
        const newHoveredButtons = [...hoveredButtons];
        newHoveredButtons[index] = setter;
        setHoveredButtons(newHoveredButtons);
    };

    return (
        <div className={"nav-container"}>
            {buttons && buttons.map((button, id) => {
                return <div
                    className={(hoveredButtons[id] ? "isHovered button-box" : "button-box")}
                    onMouseOver={() => handleHover(id, true)}
                    onMouseLeave={() => handleHover(id, false)}
                >
                    {button.caption}
                </div>
            })}
        </div>
    )
}

export default TopNavigation;
