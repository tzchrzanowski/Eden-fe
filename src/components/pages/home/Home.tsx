import React from 'react';
import './Home.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import Video from "resources/videos/eden-blue-only.mp4";
import VideoSpray from "resources/videos/eden-spray.mp4";
import intros1 from "resources/images/slides/intros_1.jpeg";
import intros2 from "resources/images/slides/intros_2.jpeg";


export function Home() {
    const [isVisible, setIsVisible]= React.useState< boolean>(true);

    const handleSlideOut=()=>{
        setIsVisible(false);
    }

    React.useEffect(()=> {
        console.log("rerender...");
    }, [isVisible])
    return (
        <div className={"HomeWrapper"}>
            <TopNavigation />
            {/* <div className={"homePageContent"}> */}
                {/* <video autoPlay loop muted height={"100%"} width={"100%"}>
                    <source src={Video} type={"video/mp4"}/>
                </video> */}
                {/* <video autoPlay loop muted height={"100%"} width={"100%"}>
                    <source src={VideoSpray} type={"video/mp4"}/>
                </video> */}
            {/* </div> */}

            <div className={"homePageContent"}>            
                <img onClick={handleSlideOut} className={!isVisible ? 'image-slide out-of-screen' : "image-slide"} src={intros1} alt="img" />
                {
                    !isVisible && (
                        <div className='img-container'>
                            <img onClick={handleSlideOut} className={"image-box"} src={intros2} alt="img" />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Home;
