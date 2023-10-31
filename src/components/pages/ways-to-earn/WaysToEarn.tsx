import React from 'react';
import './WaysToEarn.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import Epitome1 from "resources/images/slides/Epitome_1.jpeg";

export function WaysToEarn() {
    return (
        <div className={"ways-to-earn-page-wrapper"}>
            <TopNavigation />
            <div className={"ways-to-earn-page-content"}>
                <div className='img-container-ways-to-earn'>
                    <img className={"image-box-ways-to-earn"} src={Epitome1} alt="img" />
                </div>
            </div>
        </div>
    )
}

export default WaysToEarn;
