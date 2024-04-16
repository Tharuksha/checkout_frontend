import React, { useState, useEffect } from 'react';
import bgImage from './Assets1/13200x1200-1-scaled.jpg';
import bgImage1 from './Assets1/essential-web-design-books-featured-image.jpg';
import bgImage2 from './Assets1/img_mouseover3.jpg';
import bgImage3 from './Assets1/istockphoto-496878713-170667a.webp';
import bgImage4 from './Assets1/lulu-create-main-banner-1440-1x.webp';
import bgImage5 from './Assets1/perfect-website-for-a-book-v2.jpg';
import bgImage6 from './Assets1/textbooksrentbuy.jpg';
import bgImage7 from './Assets1/unnamed (1).png';
import { ReactTyped } from "react-typed";

const ServiceHome = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="service-home-container">
            <div className="service-home-content">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        <span className="block"> PLACE </span>{' '}
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
