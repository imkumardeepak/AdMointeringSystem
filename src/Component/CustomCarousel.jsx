import React, { useState, useEffect, useRef } from "react";

const CustomCarousel = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timeoutRef = useRef(null);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            handleNext();
            setIsTransitioning(true);
            setTimeout(() => setIsTransitioning(false), 500); // Match this duration to your CSS transition duration
        }, interval);

        return () => clearTimeout(timeoutRef.current);
    }, [currentIndex, interval]);

    // Stop the carousel if there are no images
    if (images.length === 0) return null;

    return (
        <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg mt-1">
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}
            {/* Previous Button */}
            {/* {images.length > 1 && (
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-2/4 -translate-y-2/4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full"
                >
                    &#10094;
                </button>
            )} */}
            {/* Next Button */}
            {/* {images.length > 1 && (
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-2/4 -translate-y-2/4 bg-black bg-opacity-50 text-white px-2 py-2 rounded-full"
                >
                    &#10095;
                </button>
            )} */}
        </div>
    );
};

export default CustomCarousel;
