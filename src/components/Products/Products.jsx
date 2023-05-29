import React, {useState, useEffect} from "react";
import {productsService, categoriesService, brandsService, sortService} from "../../Services/Services.js"
import "./index.css"

function Products() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [productsToShow, setProductsToShow] = useState([]);
    const [sotrBy, setSortBy] = useState("productName");
    const [order, setorder] = useState("ASC");

    useEffect(() => {
        (async() => {
            const responseBrands = await brandsService.getBrands();
            const brands = await responseBrands.json()
            const responseCateg = await categoriesService.getCategories();
            const categ = await responseCateg.json();
            const responseProducts = await productsService.getProducts();
            const prods = await responseProducts.json();
            prods.forEach(prod => {
                prod.category = categoriesService.getCategoriesById(categ, prod.categoryId);
                prod.brand = brandsService.getBrandById(brands, prod.brandId);
            });
            setProducts(prods);
        })();
    },[]);

    useEffect(() => {
        updateProductsToShow();
    }, [search, products]);

    const updateProductsToShow = () => {
        setProductsToShow(products.filter((prod) => {
            return (prod.productName.toLowerCase().includes(search.toLowerCase()));
        }));
    };


    return <div className="row m-1 mt-4 align-items-end">
        <div className="col-12 p-5 shadow-lg">
            <div className="row">
                <div className="col-md-3">
                    <h4>Список товарів ({products.length})</h4>
                </div>
                <div className="col-lg-9 col-md-9">
                    <input className="width100 p-2 search" placeholder="Пошук" value={search} onChange={(event) => {setSearch(event.target.value)}} ></input>
                </div>
            </div>
        </div>
        <div className="col-12">
            <div className="row justify-content-center ">
                <div className="col-10 mt-4 p-5 shadow-lg">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Brand</td>
                                <td>Category</td>
                                <td>Rating</td>
                            </tr>
                        </thead>
                        <tbody>
                            {productsToShow.map(prod => {
                                return <tr>
                                    <td>{prod.id}</td>
                                    <td>{prod.productName}</td>
                                    <td>{prod.price}</td>
                                    <td>{prod.brandName}</td>
                                    <td>{prod.categoryName}</td>
                                    <td><h5 className="width-auto">{Array(prod.rating).fill(0).map((elem,ind) => {return <i key={ind} className="fa fa-solid fa-star"></i>})}
                                        {Array(5 - prod.rating).fill(0).map((elem,ind) => {return <i key={ind} className="fa fa-solid fa-star-o"></i>})}</h5>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}

export default Products;