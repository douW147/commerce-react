import React, { useEffect, useState } from "react";
import { bannersServices } from "../../Services/Services"
import "./index.css"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";

function Main(){

    const [banners, setBanners] = useState([]);
    const [errors, setErrors] = useState("");

    useEffect(() => {  // initial only
        document.title = "Головна - 07-11";
        (async() => {
            try {
                const response = await bannersServices.getBanners();
                setBanners(response.data);
            } catch (error) {
                setErrors(error.message);
            }
        })();
    }, []);

    return <div className="row">
                <div className="col-12 --p0">
                    <div className="swiper-container">
                        <Swiper pagination={true} navigation={true} modules={[Pagination, Navigation]} className="mySwiper p-3">
                            {banners.map((banner, index) => {
                                return <SwiperSlide key={banner.id}>
                                            <div className="swiper-slide-container row">
                                                {index % 2 === 0 &&
                                                    <div className="col-9">
                                                        <img src={banner.photo} className="swiper-img shadow-lg"></img>
                                                    </div>
                                                }
                                                <div className="col-3">
                                                    <div className="row flex-column --height100">
                                                        <div className="col-12 after-photo-container after-photo-container-top">
                                                            <div className="padding-container-top">
                                                                <div className="details p-5 shadow-lg">
                                                                    <h2 className="swiper-details-big">{banner.details1}</h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 after-photo-container after-photo-container-bottom">
                                                        <div className="padding-container-bottom">
                                                                <div className="details details-bottom shadow-lg">
                                                                    <img  className="details-image" src={banner.details2}></img>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {index % 2 !== 0 &&
                                                    <div className="col-9">
                                                        <img src={banner.photo} className="swiper-img shadow-lg"></img>
                                                    </div>
                                                }
                                            </div>
                                        </SwiperSlide>
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
}

export default Main;