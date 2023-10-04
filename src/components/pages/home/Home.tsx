import React from 'react';
import './Home.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import Video from "resources/promo-blue.mp4";
export function Home() {
    return (
        <div className={"HomeWrapper"}>
            <TopNavigation />
            <div className={"landing-page-caption"}>
                <p>Eden Perfumes</p>
            </div>
            <div className={"homePageContent"}>
                <video autoPlay loop muted height={"100%"} width={"100%"}>
                    <source src={Video} type={"video/mp4"}/>
                </video>
            </div>
        </div>
    )
}
export default Home;
