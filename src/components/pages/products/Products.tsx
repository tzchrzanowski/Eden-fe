import React from 'react';
import './Products.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import VideoProducts from "../../../resources/eden-products.mp4";


export function Products() {
    return (
        <div className={"productWrapper"}>
            <TopNavigation />
            <div className={"productPageContent"}>
                <video autoPlay loop muted height={"100%"} width={"100![](../../../../../../../Downloads/385517464_1710169179463071_3101826895968287408_n.jpg)%"}>
                    <source src={VideoProducts} type={"video/mp4"}/>
                </video>
                <p>list of products...</p>
            </div>
        </div>
    )
}
export default Products;
