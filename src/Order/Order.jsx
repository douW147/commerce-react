import React, {useState} from "react";
import "./index.css"

function Order(props) {
    console.log(props)
    const [quantity, setQuantity] = useState(props.quantity);
    return <div className="col-12 shadow-lg p-5 mb-4">
        <div className="row justify-content-between">
            <h5 className="width-auto">{props.name}</h5>
            <h5 className="width-auto">{props.price}$</h5>
        </div>
        <div className="row justify-content-between mt-4 quantity-rating">
            {props.isPaymentCompleted === false &&
            <div className="quantity">
                <h6 className="width-auto">Кількість: <div className="row quantity-arrows">
                    <i className="fa fa-solid fa-angle-up" onClick={() => {
                        setQuantity(quantity+1)
                    }}></i> {quantity} <i className="fa fa-solid fa-angle-down" onClick={() => {
                        if (quantity > 1) {
                            setQuantity(quantity-1)
                        }}}></i>
                </div></h6>
            </div>
            }
            {props.isPaymentCompleted === true &&
            <h6 className="width-auto">Кількість: {quantity}</h6>
            }
            <h5 className="width-auto">{Array(props.rating).fill(0).map((elem,ind) => {return <i key={ind} className="fa fa-solid fa-star"></i>})}</h5>
        </div>
        {props.isPaymentCompleted === false &&
        <div className="row">
            <div className="order-buttons float-right">
                <button className="btn btn-dark" onClick={() => {props.onDeleteClick(props.id)}}>Delete</button>
                <button className="btn btn-dark buy-button" onClick={() => {props.onBuyClick(true, quantity, props.id, props.userId, props.productId)}}>Buy now</button>
            </div>
        </div>
        }
    </div>
}

export default React.memo(Order);