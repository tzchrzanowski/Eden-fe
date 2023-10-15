import React from 'react';
import './Products.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import VideoProducts from "../../../resources/videos/eden-products.mp4";
import F1_img from "resources/images/f1.png";
import F2_img from "resources/images/f2.png";
import M1_img from "resources/images/m1.png";
import M4_img from "resources/images/m4.png";
import Footer from "../../footer/Footer";

const listOfProducts = [
    {
        name: "F1",
        imageSrc: F1_img,
        description: "F1 similar to Repl",
    },
    {
        name: "F2",
        imageSrc: F2_img,
        description: "F2 similar to Inconlo",
    },
    {
        name: "M1",
        imageSrc: M1_img,
        description: "M1 similar to Mont Blanc Legend",
    },
    {
        name: "M4",
        imageSrc: M4_img,
        description: "M4 similar to Guess",
    }
];

export function Products() {
    return (
        <div className={"productWrapper"}>
            <TopNavigation />
            <div className={"product-page-content"}>
                <video autoPlay loop muted height={"100%"} width={"100%"}>
                    <source src={VideoProducts} type={"video/mp4"}/>
                </video>
            </div>

            <div className={"products-list-container"}>
                <p>list of products...</p>
                {listOfProducts && listOfProducts.map((product, id)=>{
                    return (
                        <div className={"product-card"}>
                            <img src={product.imageSrc} alt={product.name} width={"200px"}/>
                            <div className={"product-card-caption"}><p>Name: {product.name}</p> </div>
                            <div className={"product-card-caption"}><p>Description: {product.description}</p></div>
                        </div>
                    );
                })}
            </div>
            <Footer />
        </div>
    )
}
export default Products;
