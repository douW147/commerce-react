import React, {useContext, useState, useEffect} from "react";
import { userContext } from "../userContext.js";
import {brandsService, categoriesService, productsService} from "../Services/Services.js";
import Product from "../Product/Product.jsx";
import "./index.css"

function Store() {

    const user = useContext(userContext);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsToShow, setProductsToShow] = useState([]);
    const [search, setSearch] = useState("");

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
                setProductsToShow(products);
            }
        })();
    }, []);

    useEffect(() => {
        updateProductsToShow();
    }, [search, categories, brands])

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

    const onBuyClick = (prod) => {
        const newOrder = {
            userId: user.user.userId,
            productId: prod.id,
            quantity: 1,
            isPaymentCompleted: false
        };
        (async() => {
            const response = await fetch(`http://localhost:5000/orders`, {
                method: "POST",
                body: JSON.stringify(newOrder),
                headers: {"Content-Type": "application/json"}
            });
            if(response.ok){
                const prods = products.map((p) => {
                    if (p.id === prod.id) p.isOrdered = true;
                    return p;
                });
                setProducts(prods);
            }
        })();
    }

    const updateProductsToShow = () => {
        setProductsToShow(products
            .filter((prod) => {
              return (
                categories.filter(
                  (category) =>
                    category.id === prod.categoryId && category.isChecked
                ).length > 0
              );
            })
            .filter((prod) => {
              return (
                brands.filter(
                  (brand) => brand.id === prod.brandId && brand.isChecked
                ).length > 0
              );
            }).filter((prod) => {
                return (prod.productName.toLowerCase().includes(search.toLowerCase()));
            })
            );
    }

    return <div className="row mt-3 align-items-start">
            <div className="col-3">
                <h3 className="border-bottom b-3">Фільтри</h3>
                <div className="categories border-bottom mt-3 pb-3">
                    <h5>Категорії:</h5>
                    <div className="category-items ml-4">
                        {categories.map((categ) => {
                            return(
                                <div key={categ.id} className="filter-row mb-1">
                                    <input value={categ.isChecked} className="checkbox form-check-input" checked={categ.isChecked} onChange={() => {onCategoryChange(categ.id)}} type="checkbox" id={`categ${categ.id}`}></input>
                                    <label className="form-check-label" htmlFor={`categ${categ.id}`}>{categ.categoryName}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="brands border-bottom mt-3 pb-3">
                    <h5>Бренди:</h5>
                    <div className="brand-items">
                        {brands.map((brand) => {
                            return(
                                <div key={brand.id} className="filter-row mb-1" >
                                    <input className="checkbox form-check-input" value={brand.isChecked} checked={brand.isChecked} onChange={() => {onBrandChange(brand.id)}} type="checkbox" id={`brand${brand.id}`}></input>
                                    <label className="form-check-label" htmlFor={`brand${brand.id}`}>{brand.brandName}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="col-9">
                <div className="row">
                    <div className="col-12 p1rem">
                        <input className="width100 p-2 search" value={search} onChange={(event) => {setSearch(event.target.value)}} placeholder="Пошук"></input>
                    </div>
                </div>
                <div className="row">
                    {productsToShow.map(prod => {
                        return <Product key={prod.id} prod={prod} onBuyClick={onBuyClick}/>
                    })}
                </div>
            </div>
        </div>
};

export default Store;
