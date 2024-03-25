import React, { useState, useEffect, useReducer } from 'react';
import bgImage from './Assets1/13200x1200-1-scaled.jpg';
import bgImage1 from './Assets1/essential-web-design-books-featured-image.jpg';
import bgImage2 from './Assets1/img_mouseover3.jpg';
import bgImage3 from './Assets1/istockphoto-496878713-170667a.webp';
import bgImage4 from './Assets1/lulu-create-main-banner-1440-1x.webp';
import bgImage5 from './Assets1/perfect-website-for-a-book-v2.jpg';
import bgImage6 from './Assets1/textbooksrentbuy.jpg';
import bgImage7 from './Assets1/unnamed (1).png';
import { ReactTyped } from "react-typed";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ServiceHome = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [bgImage, bgImage1, bgImage2, bgImage3, bgImage4, bgImage5, bgImage6, bgImage7];

    const handleChange = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        afterChange: handleChange,
        centerMode: true, // Center the active slide
        centerPadding: "25%", // Adjust as needed
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="carousel-slide">
                        <img
                            src={image}
                            alt={`Carousel Image ${index + 1}`}
                            onError={(e) => {
                                e.target.onerror = null; // Avoid infinite loop
                                e.target.src = 'path/to/fallback/image'; // Provide a fallback image path or leave it empty for no image
                            }}
                        />
                    </div>
                ))}
            </Slider>
            <div className="carousel-content">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        <span className="block">THANK YOU FOR</span>{' '}
                        <span>
                            <ReactTyped
                                className="md:text-5xl sm:text-4xl text-4xl font-bold md:pl-4 text-cyan-600 font-['Maven Pro'] tracking-widest leading-loose"
                                strings={['All ', ' AREAS COVERED', 'BOOKS']}
                                typeSpeed={40}
                                backSpeed={50}
                                loop
                            />
                        </span>{' '}
                       YOUR ORDER
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-white">
                      
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServiceHome;
