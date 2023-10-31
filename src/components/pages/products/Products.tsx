import React from 'react';
import './Products.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import VideoProducts from "../../../resources/videos/eden-products.mp4";
import item1 from "resources/images/slides/item_1.jpeg";
import item2 from "resources/images/slides/item_2.jpeg";


export function Products() {
    return (
        <div className={"product-page-wrapper"}>
            <TopNavigation />
            <div className={"pageContent"}>
                <div className='img-container-product'>
                                <img className={"image-box-product"} src={item1} alt="img" />
                                <img className={"image-box-product"} src={item2} alt="img" />

                </div>
            </div>
        </div>
    )
}

export default Products;
