import React from 'react';
import "./SideNavCategory.css";

interface SideNavCategoryProps {
    categoryName: string,
    icon: string,
}

export function SideNavCategory({categoryName, icon}: SideNavCategoryProps) {
    return (
        <div className={"categoryButton"}>
            <img className={"category-icon"} src={icon} alt={categoryName} />
            <span className={"categoryButtonCaption"}>{categoryName}</span>
        </div>
    )
}

export default SideNavCategory;
