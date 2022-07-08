import React, {useState} from "react";
import "./index.css";

function Product(props){

    const [prod] = useState(props.prod)
    
    return <div className="col-lg-4 col-md-6 col-sm-12">
    <div className="p-5 m-1 shadow-lg border-radius mb-4 --300px">
        <div className="top">
            <div className="row justify-content-between">
                <h5 className="width-auto">{prod.productName}</h5>
            </div>
            <h5 className="width-auto">{prod.price}$</h5>
            <div className="row justify-content-between mt-4 quantity-rating">
                <h6>{prod.brand.brandName} {prod.category.categoryName}</h6>
            </div>
        </div>
        <div className="bottom">
            <div className="row mt-4 mb-5">
                <div className="rating-buy">
                    <div>
                        <h5 className="width-auto">{Array(prod.rating).fill(0).map((elem,ind) => {return <i key={ind} className="fa fa-solid fa-star"></i>})}
                        {Array(5 - prod.rating).fill(0).map((elem,ind) => {return <i key={ind} className="fa fa-solid fa-star-o"></i>})}</h5>
                    </div>
                    {props.prod.isOrdered === true ? (<h6>Ordered!</h6>) : 
                    (<button className="btn btn-dark buy-button" onClick={() => {props.onBuyClick(prod)}}>Buy now</button>)
                    }
                </div>
            </div>
        </div>
    </div>
</div>
}

export default Product;