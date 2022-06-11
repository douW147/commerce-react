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
        return fetch(`http://localhost:5000/orders?userId=${user}`, {method: "GET"});
    },
    getProducts: () => {
        return fetch(`http://localhost:5000/products`, {method: "GET"});
    }
};

export const brandsService = {
    getBrands: () => {
        return fetch("http://localhost:5000/brands", {method: "GET"});
    },
    getBrandById: (brands, brandId) => {
        return brands.find((brand) => brand.id === brandId)
    }
};

export const categoriesService = {
    getCategories: () => {
        return fetch("http://localhost:5000/categories", {method: "GET"});
    },
    getCategoriesById: (categories, categId) => {
        return categories.find((categ) => categ.id === categId)
    }
}

export const productsService = {
    getProducts: () => {
        return fetch("http://localhost:5000/products", {method: "GET"});
    }
}

