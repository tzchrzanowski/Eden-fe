import React from 'react';
import './About.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import Epitome1 from "resources/images/slides/Epitome_1.jpeg";
import Epitome2 from "resources/images/slides/Epitome_2.jpeg";
import Epitome3 from "resources/images/slides/Epitome_3.jpeg";
import Epitome4 from "resources/images/slides/Epitome_4.jpeg";
import Epitome5 from "resources/images/slides/Epitome_5.jpeg";
import Epitome6 from "resources/images/slides/Epitome_6.jpeg";
import Epitome7 from "resources/images/slides/Epitome_7.jpeg";


export function About() {
    return (
        <div className={"about-page-wrapper"}>
            <TopNavigation />
            <div className={"pageContent"}>
                <div className='img-container-about'>
                                <img className={"image-box-about"} src={Epitome1} alt="img" />
                                <img className={"image-box-about"} src={Epitome4} alt="img" />
                                <img className={"image-box-about"} src={Epitome2} alt="img" />
                                <img className={"image-box-about"} src={Epitome3} alt="img" />
                                <img className={"image-box-about"} src={Epitome7} alt="img" />
                                <img className={"image-box-about"} src={Epitome5} alt="img" />
                                <img className={"image-box-about"} src={Epitome6} alt="img" />

                </div>
            </div>
        </div>
    )
}

export default About;
