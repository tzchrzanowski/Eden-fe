import React from 'react';
import './Products.css';
import TopNavigation from "components/top-navigation/TopNavigation";

export function Products() {
    return (
        <div className={"pageWrapper"}>
            <TopNavigation />
            <div className={"pageContent"}>
                <p>Products Page</p>
                <p>list of products...</p>
            </div>
        </div>
    )
}
export default Products;
