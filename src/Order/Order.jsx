import React, {} from "react";
import "./index.css"

function Order(props) {
    console.log("refresh")
    return <div className="col-12 shadow-lg p-5 mb-4">
        <div className="row justify-content-between">
            <h5 className="width-auto">{props.name}</h5>
            <h5 className="width-auto">{props.price}$</h5>
        </div>
        <div className="row justify-content-between mt-4">
            <h6 className="width-auto">Кількість: {props.quantity}</h6>
            <h5 className="width-auto">{Array(props.rating).fill(0).map((elem,ind) => {return <i key={ind} className="fa fa-solid fa-star"></i>})}</h5>
        </div>
        
    </div>
}

export default React.memo(Order);