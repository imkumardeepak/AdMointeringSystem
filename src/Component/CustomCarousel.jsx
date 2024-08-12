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

    return (
        <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg mt-1">
            <div
                className={`absolute inset-0 flex transition-transform duration-500 ease-in-out ${isTransitioning ? "transform translate-x-0" : ""
                    }`}
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                ))}
            </div>
            {/* Previous Button */}
            <button
                onClick={handlePrev}
                className="absolute left-0 top-2/4 -translate-y-2/4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full"
            >
                &#10094;
            </button>
            {/* Next Button */}
            <button
                onClick={handleNext}
                className="absolute right-0 top-2/4 -translate-y-2/4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full"
            >
                &#10095;
            </button>
        </div>
    );
};

export default CustomCarousel;
