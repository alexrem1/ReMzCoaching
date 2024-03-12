import "./Home.css";
import car1 from "../Images/Landing/1.jpg";
import car2 from "../Images/Landing/2.jpg";
import car3 from "../Images/Landing/3.jpg";
import car4 from "../Images/Landing/4.jpg";
import car5 from "../Images/Landing/5.jpg";
import ImageSliderComponent from "./ImageSliderComponent";

function Home() {
  const images = [
    { url: car1, alt: "image one" },
    { url: car2, alt: "image two" },
    { url: car3, atl: "image three" },
    { url: car4, alt: "image four" },
    { url: car5, alt: "image five" },
  ];
  return (
    <div className="section">
      <h1>Join the fun!</h1>
      <div className="img-slider">
        <ImageSliderComponent imageURLs={images} />
      </div>
      <div className="calling">
        <p> Why not become a member and benefit from its advantages?</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, ad.
          Quas, eligendi non aspernatur suscipit labore qui ab harum, similique
          corrupti quis, placeat error molestias minima provident illo culpa?
          Facilis? Ipsa necessitatibus explicabo minima neque! Molestiae eius
          ipsam ea nobis repudiandae! Excepturi, explicabo laudantium
          repudiandae odit ex quasi illo nemo expedita beatae amet consequuntur
          quia esse ea rem, cum hic?
        </p>
      </div>
    </div>
  );
}

export default Home;
