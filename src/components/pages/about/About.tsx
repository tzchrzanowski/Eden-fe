import React from 'react';
import './About.css';
import TopNavigation from "components/top-navigation/TopNavigation";

export function About() {
    return (
        <div className={"about-page-wrapper"}>
            <TopNavigation />
            <div className={"pageContent"}>
                <p>About</p>
                <p>...</p>
            </div>
        </div>
    )
}

export default About;
