import React from 'react';
import "./SideNavCategory.css";
import {ButtonsCategory} from "../SideNavigation";

// categoryName={category.caption} key={id} icon={category.iconSrc}
interface SideNavCategoryProps {
    category: ButtonsCategory,
    onClickCallback: (buttonType: String)=> void;
}

export function SideNavCategory({category, onClickCallback}: SideNavCategoryProps) {
    return (
        <div className={"categoryButton"} onClick={()=>onClickCallback(category.buttonId)}>
            <img className={"category-icon"} src={category.iconSrc} alt={category.caption} />
            <span className={"categoryButtonCaption"}>{category.caption}</span>
        </div>
    )
}

export default SideNavCategory;
