import React, {useContext, useState, useEffect} from "react";
import { userContext } from "../userContext.js";
import {brandsService, categoriesService, productsService} from "../Services/Services.js";
import "./index.css"

function Store() {

    const user = useContext(userContext);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        document.title = "07-11 Store";
        (async() => {
            const brandsResponse = await brandsService.getBrands();
            const brands = await brandsResponse.json();
            brands.forEach(brand => {
                brand.isChecked = true;
            });
            setBrands(brands);
            const categoriesResponse = await categoriesService.getCategories();
            const categories = await categoriesResponse.json();
            categories.forEach(categ => {
                categ.isChecked = true;
            });
            setCategories(categories);
            const productsResp = await productsService.getProducts();
            if (productsResp.ok) {
                const products = await productsResp.json();
                products.forEach((prod) => {
                    prod.isOrdered = false;
                    prod.category = categoriesService.getCategoriesById(categories, prod.categoryId);
                    prod.brand = brandsService.getBrandById(brands, prod.brandId);
                });
                setProducts(products);
            }
        })();
    }, []);

    const onCategoryChange = (id) => {
        const newCat = categories.map(cat => {
            if (cat.id === id){
                cat.isChecked = !cat.isChecked
            }
            return cat
        });
        setCategories(newCat);
    };

    const onBrandChange = (id) => {
        const newBrands = brands.map(brand => {
            if (brand.id === id){
                brand.isChecked = !brand.isChecked
            }
            return brand
        });
        setBrands(newBrands);
    };

    return <div className="row mt-3">
            <div className="col-3">
                <h3 className="border-bottom b-3">Фільтри</h3>
                <div className="categories border-bottom mt-3 pb-3">
                    <h5>Категорії:</h5>
                    {categories.map((categ) => {
                        return(
                            <div key={categ.id} >
                                <input value={categ.isChecked} className="checkbox form-check-input" checked={categ.isChecked} onChange={() => {onCategoryChange(categ.id)}} type="checkbox" id={`categ${categ.id}`}></input>
                                <label className="form-check-label" htmlFor={`categ${categ.id}`}>{categ.categoryName}</label>
                            </div>
                        )
                    })}
                </div>
                <div className="brands border-bottom mt-3 pb-3">
                    <h5>Бренди:</h5>
                    {brands.map((brand) => {
                        return(
                            <div key={brand.id} >
                                <input className="checkbox form-check-input" value={brand.isChecked} checked={brand.isChecked} onChange={() => {onBrandChange(brand.id)}} type="checkbox" id={`brand${brand.id}`}></input>
                                <label className="form-check-label" htmlFor={`brand${brand.id}`}>{brand.brandName}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="col-9">
                {JSON.stringify(brands)}
                {JSON.stringify(products)}
                {JSON.stringify(categories)}
            </div>
        </div>
};

export default Store;
