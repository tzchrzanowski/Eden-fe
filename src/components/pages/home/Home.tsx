import React from 'react';
import './Home.css';
import TopNavigation from "components/top-navigation/TopNavigation";

export function Home() {
    return (
        <div className={"HomeWrapper"}>
            <TopNavigation />
            <div className={"pageContent"}>
                <p>Home Page</p>
                <p>Eden Perfumes</p>
            </div>
        </div>
    )
}
export default Home;
