export const OrderServices = {
    getPrevOrders: (orders) => {
        return orders.filter(order => order.isPaymentCompleted === true)
    },
    getCartOrders: (orders) => {
        return orders.filter(order => order.isPaymentCompleted === false)
    },
};

export const fetchService = {
    getUser: (user) => {
        return fetch(`http://localhost:5000/orders?userId=${user}`, {method: "GET"})
    },
    getProducts: () => {
        return fetch(`http://localhost:5000/products`, {method: "GET"})
    }
}