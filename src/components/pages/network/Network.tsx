import React from 'react';
import './Network.css';
import TopNavigation from "components/top-navigation/TopNavigation";

export function Network() {
    return (
        <div className={"pageWrapper"}>
            <TopNavigation />
            <div className={"pageContent"}>
                <p>Network Page</p>
                <p>Binary tree will go here...</p>
            </div>
        </div>
    )
}
export default Network;
