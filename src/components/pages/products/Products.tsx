import React from 'react';
import './Products.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import item2 from "resources/images/slides/item_2.jpeg";
import boy1 from "resources/images/slides/boy1.jpg";
import boy2 from "resources/images/slides/boy2.jpg";
import boy3 from "resources/images/slides/boy3.jpg";
import boy4 from "resources/images/slides/boy4.jpg";
import boy5 from "resources/images/slides/boy5.jpg";
import boy6 from "resources/images/slides/boy6.jpg";
import boy7 from "resources/images/slides/boy7.jpg";
import boy8 from "resources/images/slides/boy8.jpg";
import boy9 from "resources/images/slides/boy9.jpg";
import boy10 from "resources/images/slides/boy10.jpg";
import boy11 from "resources/images/slides/boy11.jpg";
import boy12 from "resources/images/slides/boy12.jpg";
import boy13 from "resources/images/slides/boy13.jpg";
import boy14 from "resources/images/slides/boy14.jpg";
import boy15 from "resources/images/slides/boy15.jpg";
import boy16 from "resources/images/slides/boy16.jpg";
import boy17 from "resources/images/slides/boy17.jpg";
import boy18 from "resources/images/slides/boy18.jpg";
import boy19 from "resources/images/slides/boy19.jpg";
import boy20 from "resources/images/slides/boy20.jpg";
import boy21 from "resources/images/slides/boy21.jpg";
import gl1 from "resources/images/slides/gl1.jpg";
import gl2 from "resources/images/slides/gl2.jpg";
import gl3 from "resources/images/slides/gl3.jpg";
import gl4 from "resources/images/slides/gl4.jpg";
import gl6 from "resources/images/slides/gl6.jpg";
import gl7 from "resources/images/slides/gl7.jpg";
import gl8 from "resources/images/slides/gl8.jpg";
import gl9 from "resources/images/slides/gl9.jpg";
import gl10 from "resources/images/slides/gl10.jpg";
import gl11 from "resources/images/slides/gl11.jpg";
import gl12 from "resources/images/slides/gl12.jpg";
import gl13 from "resources/images/slides/gl13.jpg";
import gl14 from "resources/images/slides/gl14.jpg";
import gl15 from "resources/images/slides/gl15.jpg";
import gl16 from "resources/images/slides/gl16.jpg";
import gl17 from "resources/images/slides/gl17.jpg";
import gl18 from "resources/images/slides/gl18.jpg";
import gl19 from "resources/images/slides/gl19.jpg";
import gl20 from "resources/images/slides/gl20.jpg";
import gl21 from "resources/images/slides/gl21.jpg";
import gl22 from "resources/images/slides/gl22.jpg";
import productsVideo from "resources/videos/products_video_.mp4";
import productVideo from "resources/videos/product_video_women.mp4";

export function Products() {
    return (
        <div className={"product-page-wrapper"}>
            <TopNavigation />
            <div className={"pageContent"}>
                <div className='img-container-product'>
                    <video className={"video-player"} autoPlay muted loop controls>
                        <source src={productsVideo} type={"video/mp4"}/>
                    </video>
                    <br/>
                    <video className={"video-player"} autoPlay muted loop controls>
                        <source src={productVideo} type={"video/mp4"}/>
                    </video>
                    <img className={"image-box-product-list"} src={item2} alt="img" />
                    <img className={"image-box-product"} src={boy1} alt="img" />
                    <img className={"image-box-product"} src={boy2} alt="img" />
                    <img className={"image-box-product"} src={boy3} alt="img" />
                    <img className={"image-box-product"} src={boy4} alt="img" />
                    <img className={"image-box-product"} src={boy5} alt="img" />
                    <img className={"image-box-product"} src={boy6} alt="img" />
                    <img className={"image-box-product"} src={boy21} alt="img" />
                    <img className={"image-box-product"} src={boy7} alt="img" />
                    <img className={"image-box-product"} src={boy8} alt="img" />
                    <img className={"image-box-product"} src={boy9} alt="img" />
                    <img className={"image-box-product"} src={boy10} alt="img" />
                    <img className={"image-box-product"} src={boy11} alt="img" />
                    <img className={"image-box-product"} src={boy12} alt="img" />
                    <img className={"image-box-product"} src={boy13} alt="img" />
                    <img className={"image-box-product"} src={boy14} alt="img" />
                    <img className={"image-box-product"} src={boy15} alt="img" />
                    <img className={"image-box-product"} src={boy16} alt="img" />
                    <img className={"image-box-product"} src={boy17} alt="img" />
                    <img className={"image-box-product"} src={boy18} alt="img" />
                    <img className={"image-box-product"} src={boy19} alt="img" />
                    <img className={"image-box-product"} src={boy20} alt="img" />
                    <img className={"image-box-product"} src={gl1} alt="img" />
                    <img className={"image-box-product"} src={gl2} alt="img" />
                    <img className={"image-box-product"} src={gl3} alt="img" />
                    <img className={"image-box-product"} src={gl4} alt="img" />
                    <img className={"image-box-product"} src={gl6} alt="img" />
                    <img className={"image-box-product"} src={gl7} alt="img" />
                    <img className={"image-box-product"} src={gl8} alt="img" />
                    <img className={"image-box-product"} src={gl9} alt="img" />
                    <img className={"image-box-product"} src={gl10} alt="img" />
                    <img className={"image-box-product"} src={gl11} alt="img" />
                    <img className={"image-box-product"} src={gl12} alt="img" />
                    <img className={"image-box-product"} src={gl13} alt="img" />
                    <img className={"image-box-product"} src={gl14} alt="img" />
                    <img className={"image-box-product"} src={gl15} alt="img" />
                    <img className={"image-box-product"} src={gl16} alt="img" />
                    <img className={"image-box-product"} src={gl17} alt="img" />
                    <img className={"image-box-product"} src={gl18} alt="img" />
                    <img className={"image-box-product"} src={gl19} alt="img" />
                    <img className={"image-box-product"} src={gl20} alt="img" />
                    <img className={"image-box-product"} src={gl21} alt="img" />
                    <img className={"image-box-product"} src={gl22} alt="img" />

                </div>
            </div>
        </div>
    )
}

export default Products;
