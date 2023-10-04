import React from 'react';
import './Contact.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import bubble from 'resources/chat-bubble-icon.svg';
import phone from 'resources/phone-icon.svg';
import email from "resources/mail-icon.svg";
import location from "resources/location-icon.svg"

interface ContactOption {
    src: string,
    headerCaption: string,
    description: string
}

export function Contact() {

    const contactOptions: ContactOption[] = [
        {
            src: phone,
            headerCaption: "Phone:",
            description: "0956 988 8368",
        },
        {
            src: email,
            headerCaption: "Email:",
            description: "loangdorena87@gmail.com",
        },
        {
            src: location,
            headerCaption: "Address:",
            description: "N.Bacalso st. Grace Compound barangay sanicols basak pardo cebu city",
        }
    ];

    return (
        <div className={"contactWrapper"}>
            <TopNavigation />
            <div className={"pageContent"}>
                <div className={'big-icon-wrapper'}>
                    <img src={bubble} alt={"bubble"} />
                </div>
                <div className={'smallCaption'}>
                    <p>If you want to do business, it is best to find someone who has already been there! Contact us now and lets start your's!</p>
                    {contactOptions && contactOptions.map((option, id) => {
                        return (
                            <div className='caption-row-wrapper' key={id}>
                                <img src={option.src} alt={option.src} />
                                <div className='fb-column'>
                                    <span className='span-wrapper'>{option.headerCaption}</span>
                                    <span className='span-wrapper'>{option.description}</span>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </div>
    )
}
export default Contact;
