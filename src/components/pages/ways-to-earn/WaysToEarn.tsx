import React from 'react';
import './WaysToEarn.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import ways1 from "resources/images/slides/ways_1.jpeg";
import ways2 from "resources/images/slides/ways_2.jpeg";
import ways3 from "resources/images/slides/ways_3.jpeg";
import ways4 from "resources/images/slides/ways_4.jpeg";
import ways5 from "resources/images/slides/ways_5.jpeg";
import ways6 from "resources/images/slides/ways_6.jpeg";
import ways7 from "resources/images/slides/ways_7.jpeg";
import ways8 from "resources/images/slides/ways_8.jpeg";
import ways9 from "resources/images/slides/ways_9.jpeg";
import ways10 from "resources/images/slides/ways_10.jpeg";




export function WaysToEarn() {
    return (
        <div className={"ways-to-earn-page-wrapper"}>
            <TopNavigation />
            <div className={"ways-to-earn-page-content"}>
                <div className='img-container-ways-to-earn'>
                    <img className={"image-box-ways-to-earn"} src={ways1} alt="img" />
                    <img className={"image-box-ways-to-earn"} src={ways2} alt="img" />
                    <img className={"image-box-ways-to-earn"} src={ways3} alt="img" />
                    <img className={"image-box-ways-to-earn"} src={ways4} alt="img" />
                    <img className={"image-box-ways-to-earn"} src={ways5} alt="img" />
                    <img className={"image-box-ways-to-earn"} src={ways6} alt="img" />
                    <img className={"image-box-ways-to-earn"} src={ways7} alt="img" />
                    <img className={"image-box-ways-to-earn"} src={ways8} alt="img" />
                    <img className={"image-box-ways-to-earn"} src={ways9} alt="img" />
                    <img className={"image-box-ways-to-earn"} src={ways10} alt="img" />


                </div>
            </div>
        </div>
    )
}

export default WaysToEarn;
