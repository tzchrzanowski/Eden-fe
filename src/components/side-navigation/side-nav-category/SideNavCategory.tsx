import React from 'react';
import "./SideNavCategory.css";

interface SideNavCategoryProps {
    categoryName: string,
}

export function SideNavCategory({categoryName}: SideNavCategoryProps) {
    return (
        <div className={"categoryButton"}>
            <span className={"categoryButtonCaption"}>{categoryName}</span>
        </div>
    )
}

export default SideNavCategory;
