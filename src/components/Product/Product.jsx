import React, {useEffect, useState} from "react";
import "./index.css";

function Product(props){

    const [prod] = useState(props.prod);

    
    useEffect(() => {
        const myPanels = document.querySelectorAll(`[id^="prod-card"]`);
        const subpanels = document.querySelectorAll(`[id^="card-container"]`);
        myPanels.forEach(myPanel => {

            const subpanel = myPanel.children[0];
            if (myPanel){
                myPanel.onmousemove = transformPanel;
                myPanel.onmouseenter = handleMouseEnter;
                myPanel.onmouseleave = handleMouseLeave;
            
                let mouseX, mouseY;
            
                let transformAmount = 3;
            
                function transformPanel(mouseEvent) {
                    mouseX = mouseEvent.pageX;
                    mouseY = mouseEvent.pageY;
            
                    const centerX = myPanel.offsetLeft + myPanel.clientWidth / 2;
                    const centerY = myPanel.offsetTop + myPanel.clientHeight / 2;
            
                    const percentX = (mouseX - centerX) / (myPanel.clientWidth / 2);
                    const percentY = -((mouseY - centerY) / (myPanel.clientHeight / 2));
            
                    subpanel.style.transform = "perspective(400px) rotateY(" + percentX * transformAmount + "deg) rotateX(" + percentY * transformAmount + "deg)";
            }}
            function handleMouseEnter() {
                setTimeout(() => {
                    subpanel.style.transition = "";
                }, 100);
                subpanel.style.transition = "transform 0.1s";
            }
        
            function handleMouseLeave() {
                subpanel.style.transition = "transform 0.1s";
                setTimeout(() => {
                    subpanel.style.transition = "";
                }, 100);
        
                subpanel.style.transform = "perspective(400px) rotateY(0deg) rotateX(0deg)";
            }
        })
        
    }, [document.querySelectorAll(`[id^="prod-card"]`), document.querySelectorAll(`[id^="card-container"]`)])
    
    
    return <div className="col-lg-4 col-md-6 col-sm-12 mb-4" id="prod-card">
                <div style={{backgroundImage: `url(${prod.photos[0]})`}} className="m-1 shadow-lg border-radius mb-4" id="card-container">
                    <div className="card-content">
                        <div className="card-details p-3">
                            <div className="card-heading">
                                <h2>{prod.productName}</h2>
                                <h6 className="width-auto">{Array(prod.rating).fill(0).map((elem,ind) => {return <i key={ind} className="fa fa-solid fa-star"></i>})}
                                {Array(5 - prod.rating).fill(0).map((elem,ind) => {return <i key={ind} className="fa fa-solid fa-star-o"></i>})}</h6>
                            </div>
                            <div className="card-buy">
                                <h5>
                                    {prod.price} UAH
                                </h5>
                                {props.prod.isOrdered === true ? (<h6>Ordered!</h6>) : 
                                (<button className="btn btn-dark buy-button --mt0" onClick={() => {props.onBuyClick(prod)}}>Купити</button>)
                                }
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
}

export default React.memo(Product);