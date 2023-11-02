import React from 'react';
import './Products.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import item2 from "resources/images/slides/item_2.jpeg";
import productsVideo from "resources/videos/products_video_.mp4";

export function Products() {
    return (
        <div className={"product-page-wrapper"}>
            <TopNavigation />
            <div className={"pageContent"}>
                <div className='img-container-product'>
                    <video className={"video-player"} autoPlay muted loop controls>
                        <source src={productsVideo} type={"video/mp4"}/>
                    </video>
                    <img className={"image-box-product"} src={item2} alt="img" />
                </div>
            </div>
        </div>
    )
}

export default Products;
