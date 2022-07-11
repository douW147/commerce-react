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
                            {banners.map((banner) => {
                                return <SwiperSlide key={banner.id}>
                                            
                                            <img src={banner.photo} className="swiper-img"></img>
                                            {/* <h2 className="swiper-details">{banner.details}</h2> */}
                                        </SwiperSlide>
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
}

export default Main;