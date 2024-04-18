import "./Home.css";
import ImageSliderComponent from "./ImageSliderComponent";
import Reviews from "./Reviews";
import useUtilities from "../CustomHooks/useUtilities";
import { useIsAuthenticated } from "../Context/AuthContext";
import personalized from "../Images/Landing/28462458_7398348.jpg";
import top from "../Images/Landing/10289157_4374013.jpg";
import family from "../Images/Landing/family-43873_1280.png";
import group from "../Images/Landing/958027_OF16710.jpg";
import vr from "../Images/Landing/72376234_2304-i301-013-S-m004-c13-VR-sports-tranings-isometric-composition.jpg";

function Home() {
  const { navigate } = useUtilities();
  const { auth } = useIsAuthenticated();

  return (
    <>
      {/* <div className="section">
        <h1>Join the fun!</h1>
        <div className="img-slider">
          <ImageSliderComponent />
        </div>
        <div className="calling">
          <p> Why not become a member and benefit from its advantages?</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          </p>
        </div>
      </div> */}
      <div className="landing-container">
        <div>
          <h1 className="headline">Empowering Future Stars</h1>
          <p className="quote">
            "Success is not just about winning; it's about the journey, the
            growth, and the passion."
          </p>
          <p className="author">- ReMz Coaching</p>
        </div>
      </div>
      <div className="content-container">
        <div className="reasons-section">
          <div className="reasons-content">
            <div className="reasons-list">
              <div className="list-img">
                <img src={personalized} alt="" />
              </div>
              <div className="list-title">
                <h3>Personalised coaching for every child</h3>
              </div>
              <div className="hero-text">
                <p>
                  New to the game? Welcome aboard. Aspiring for greatness? Join
                  our ranks. Wherever your child stands on their athletic path,
                  our tailored coaching ensures they reach their full potential.
                </p>
              </div>
            </div>
            <div className="reasons-list">
              <div className="list-img">
                <img src={top} alt="" />
              </div>
              <div className="list-title">
                <h3>Expert coaches and quality facilities</h3>
              </div>
              <div className="hero-text">
                <p>
                  We employ top-tier professional football coaches and utilize
                  premium facilities, often offering both indoor and outdoor
                  options. This ensures your child can enjoy playing football in
                  a nurturing and secure environment.
                </p>
              </div>
            </div>
            <div className="reasons-list">
              <div className="list-img">
                <img src={family} alt="" />
              </div>
              <div className="list-title">
                <h3>2 years of happy parents</h3>
              </div>
              <div className="hero-text">
                <p>
                  We're committed to delivering outstanding value and
                  accessibility. With training available at 2 convenient venues
                  across England, our packed sessions ensure top-notch football
                  training that's both accessible and worthwhile.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="statement-section two">
          <p className="hero-title two">What we do</p>
          <p className="hero-description">
            We offer fun football training sessions which help players become
            the best they can be. Our proven training syllabus runs 50 weeks of
            the year and has helped players achieve ranging level of success.
            Some players have grown in confidence and developed a love for
            football and others have progressed to becoming premier league
            footballers.
          </p>
        </div>
        <div className="reasons-section">
          <div className="reasons-content">
            <div className="reasons-list">
              <div className="list-img">
                <img src={group} alt="" />
              </div>
              <div className="list-title">
                <h3>Daily Group Training</h3>
              </div>
              <div className="hero-text">
                <p>
                  New to the game? Welcome aboard. Aspiring for greatness? Join
                  our ranks. Wherever your child stands on their athletic path,
                  our tailored coaching ensures they reach their full potential.
                </p>
              </div>
            </div>
            <div className="reasons-list">
              <div className="list-img">
                <img src={vr} alt="" />
              </div>
              <div className="list-title">
                <h3>Football Development Camps</h3>
              </div>
              <div className="hero-text">
                <p>
                  Exciting news! Get ready for our upcoming development camps
                  designed to take your skills to the next level. Stay tuned for
                  more details on how you can join these enriching and intensive
                  training programs. Unlock your potential and elevate your game
                  with our development camps.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="statement-section">
          <div className="hero-title">
            <p>Reviews</p>
          </div>
        </div>
        <Reviews />
        {auth ? (
          <>
            <div className="statement-section">
              <div className="hero-title">
                <p>Make a booking today! </p>
              </div>
            </div>
            <div className="reasons-section sign-up">
              <div className="reasons-content">
                <div className="reasons-list">
                  <div className="hero-text">
                    <p>
                      Give your child the best possible start to their
                      footballing journey that will change their lives with us
                      at ReMz Coaching.
                    </p>
                  </div>
                  <button
                    className="primary-cta"
                    onClick={() => {
                      navigate("/products");
                    }}
                  >
                    Book now
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="statement-section">
              <div className="hero-title">
                <p>Join today! </p>
              </div>
            </div>
            <div className="reasons-section sign-up">
              <div className="reasons-content">
                <div className="reasons-list">
                  <div className="hero-text">
                    <p>
                      Sign up to view what services we offer, purchase our
                      services, view purchases made and make amendements to your
                      profile.
                    </p>
                  </div>
                  <button
                    className="primary-cta"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Sign up
                  </button>
                </div>
                {/* <div className="reasons-list">
            <div className="list-title">
              <h3>Have a look at our services we provide</h3>
            </div>
            <div className="hero-text">
              <p>
                Our academy managers frequently hold FA Level 3 qualifications,
                while our younger coaches commonly possess Level 1 and 2
                certifications. Drawing from extensive playing experiences at
                high levels, our coaches undergo rigorous examinations
                administered by ReMz Coaching, fostering a coaching environment
                rich in creativity and imagination.
              </p>
            </div>
          </div> */}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
