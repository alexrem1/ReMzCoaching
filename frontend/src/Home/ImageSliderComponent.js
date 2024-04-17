import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import car1 from "../Images/Landing/pexels-alexander-nadrilyanski-3684122.jpg";
import car2 from "../Images/Landing/pexels-lukas-296302.jpg";
import car3 from "../Images/Landing/pexels-mica-asato-772491.jpg";
import car4 from "../Images/Landing/pexels-tima-miroshnichenko-6078300.jpg";

export default function ImageSliderComponent() {
  const images = [
    { url: car1, alt: "image one" },
    { url: car2, alt: "image two" },
    { url: car3, atl: "image three" },
    { url: car4, alt: "image four" },
  ];

  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {images.map((url, index) => (
          <img
            key={index}
            src={url.url}
            alt={url.alt}
            aria-hidden={imageIndex !== index}
            className="img-slider-img"
            style={{ translate: `${-100 * imageIndex}%` }}
          />
        ))}
      </div>
      <button
        className="img-slider-btn"
        style={{ left: "0" }}
        onClick={showPrevImage}
        aria-label="View Previous Image"
      >
        <ArrowBigLeft aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        className="img-slider-btn"
        style={{ right: "0" }}
        aria-label="View Next Image"
      >
        <ArrowBigRight aria-hidden />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: ".25rem",
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            aria-label={`View Image ${index}`}
            className="img-slider-dot-btn"
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <CircleDot aria-hidden />
            ) : (
              <Circle aria-hidden />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
