import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import useUtilities from "../CustomHooks/useUtilities";
import jolly from "../Images/Reviews/15187.jpg";
import john from "../Images/Reviews/15741.jpg";
import susan from "../Images/Reviews/40759.jpg";
import justina from "../Images/Reviews/2150285283.jpg";
import "./Reviews.css";

function Reviews() {
  const reviews = [
    {
      url: jolly,
      alt: "image one",
      comment:
        "ReMz Coaching offers exceptional service. The coaches are professional, dedicated, and provide personalized attention. Communication is seamless, and they address concerns promptly. Highly recommended.",
      title: "Jolly Smith, Parent",
    },

    {
      url: john,
      alt: "image two",
      comment:
        "My kids love ReMz Coaching! The sessions are fun and engaging, with varied activities that challenge them to improve. Seeing their smiles after each session is priceless.",
      title: "John Wick, Parent",
    },

    {
      url: susan,
      alt: "image three",
      comment:
        "Impressed with ReMz Coaching's service. Coaches are knowledgeable, passionate, and dedicated to each child's needs. Efficient management and clear communication.",
      title: "Department for Education (DfE)",
    },
    {
      url: justina,
      alt: "image four",
      comment:
        "ReMz Coaching has transformed my kids' football experience. They eagerly anticipate each session, enjoying the positive atmosphere and teamwork. It's ignited a passion for football in them.",
      title: "Justina Wentworth, Parent",
    },
  ];
  const {
    setActiveProductIndex,
    activeProductIndex,
    handleNextProduct,
    handlePrevProduct,
  } = useUtilities(reviews);

  return (
    <div className="reviews-container">
      {reviews.map((review, index) => (
        <div
          key={index}
          className={`reviews ${index === activeProductIndex ? "active" : ""}`}
        >
          <div className="reviews-img">
            <img src={review.url} alt="" />
          </div>
          <div className="reviews-comment hero-statement">
            <p>{review.comment}</p>
          </div>
          <div className="reviews-title">
            <p>{review.title}</p>
          </div>
        </div>
      ))}

      <button
        className="img-slider-btn left"
        style={{ left: "0" }}
        onClick={handlePrevProduct}
        aria-label="View Previous Image"
      >
        <ArrowBigLeft aria-hidden />
      </button>
      <button
        onClick={handleNextProduct}
        className="img-slider-btn right"
        style={{ right: "0" }}
        aria-label="View Next Image"
      >
        <ArrowBigRight aria-hidden />
      </button>
      <div className="dot-container">
        {reviews.map((_, index) => (
          <button
            key={index}
            aria-label={`View Image ${index}`}
            className="img-slider-dot-btn"
            onClick={() => setActiveProductIndex(index)}
          >
            {index === activeProductIndex ? (
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
export default Reviews;
