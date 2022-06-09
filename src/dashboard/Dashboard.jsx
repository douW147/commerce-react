import React, {useEffect, useContext, useState, useCallback} from 'react';
import {userContext} from '../userContext.js';
import "./index.css"
import Order from '../Order/Order.jsx';
import {OrderServices, fetchService} from '../Services/Services.js';

function Dashboard() {

    const [orders, setOrders] = useState([]);
    const UserContex = useContext(userContext);

    const loadOrders = useCallback(async() => {
        const response = await fetchService.getUser(UserContex.user.userId);
        if (response.ok){
            const ordersData = await response.json();
            const productsResp = await fetchService.getProducts();
            if(productsResp.ok){
                const products = await productsResp.json();
                ordersData.forEach(order => {
                    order.product = products.find(prod => {
                        return prod.id === order.productId
                    });
                });
            }
            setOrders(ordersData);
        }     
    }, [UserContex.user.userId] )

    const onBuyClick = useCallback(async(isPaymentCompleted, quantity, id, userId, productId) => {
        const newOrderData = {
            id: id,
            userId: userId,
            productId: productId,
            quantity: quantity,
            isPaymentCompleted: isPaymentCompleted,
        }
        const response = await fetch(`http://localhost:5000/orders/${id}`, {
            method: "PUT",
            body: JSON.stringify(newOrderData),
            headers: {"Content-type": "application/json"}
        });
        if (response.ok) {
            loadOrders();
          }
    }, [loadOrders]);

    const onDeleteClick = useCallback(async (orderId) => {
        const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
            method: "DELETE"
        });
        if (response.ok){
            loadOrders();
        }
    }, [loadOrders])

    useEffect(() => { 
        document.title = "Dashboard - 07-11";
        loadOrders();
    }, [UserContex.user.userId, loadOrders, onBuyClick, onDeleteClick])

    return(
        <div className='row mt-4'>
            <button className='btn btn-sm mb-3' onClick={loadOrders}><h6>Оновити дані  <i className='fa fa-refresh'/></h6></button>
            <div className='col-md-6 col-12'>
                <div className='card p-4'>
                    <h3 className='border-bottom '>Попередні замовлення: {OrderServices.getPrevOrders(orders).length}</h3>
                    <div className='row mt-4'>
                        {OrderServices.getPrevOrders(orders).length > 0 && 
                        OrderServices.getPrevOrders(orders).map(ord => {
                        return (<Order key={ord.id} name={ord.product.productName} price={ord.product.price} brandId={ord.product.brandId}
                            categoryId={ord.product.categoryId} rating={ord.product.rating} quantity={ord.quantity} userId={ord.userId}
                            productId={ord.productId} isPaymentCompleted={ord.isPaymentCompleted} onBuyClick={onBuyClick} id={ord.id}
                            onDeleteClick={onDeleteClick}
                        />)})}
                    </div>
                </div>
            </div>
            <div className='col-md-6 col-12'>
                <div className='card p-4'>
                    <h3 className='border-bottom '>Корзина: {OrderServices.getCartOrders(orders).length}</h3>
                    <div className='row mt-4'>
                        {OrderServices.getCartOrders(orders).length > 0 && 
                        OrderServices.getCartOrders(orders).map(ord => {
                        return (<Order key={ord.id} name={ord.product.productName} price={ord.product.price} brandId={ord.product.brandId}
                            categoryId={ord.product.categoryId} rating={ord.product.rating} quantity={ord.quantity} userId={ord.userId}
                            productId={ord.productId} isPaymentCompleted={ord.isPaymentCompleted} onBuyClick={onBuyClick} id={ord.id}
                            onDeleteClick={onDeleteClick}
                        />)})}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;