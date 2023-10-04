import React from 'react';
import './Contact.css';
import TopNavigation from "components/top-navigation/TopNavigation";

export function Contact() {
    return (
        <div className={"pageWrapper"}>
            <TopNavigation />
            <div className={"pageContent"}>
                <p>Contact Page</p>
                <p>tel:...</p>
            </div>
        </div>
    )
}
export default Contact;
