import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-overlay">
          <h1>About Us</h1>
          <p>Home &gt; About Us</p>
        </div>
      </div>

      {/* VIDEO SECTION */}
      <div className="video-section">
  <h2 className="video-title">We Invite You to Visit Our Restaurant</h2>
  <p className="video-subtitle">Experience authentic flavors and warm ambiance</p>


        <div className="video-container">
          <iframe
            src="/image/res.mp4"
            title="Restaurant Video"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* WHAT WE DO */}
      <div className="services">
  <h2 className="services-title">What We Do</h2>
  <p className="section-subtitle">Crafting unforgettable dining experiences</p>


        <div className="slider">
          <div className="slide-track">

            {[...Array(2)].map((_, index) =>
              [
                { title: "Fresh Food", desc: "High quality ingredients" },
                { title: "Skilled Chefs", desc: "Expert cooking masters" },
                { title: "Fine Dining", desc: "Luxury experience" },
                { title: "Vegan Cuisine", desc: "Healthy & tasty" },
                { title: "Desserts", desc: "Sweet delights" },
                { title: "Drinks", desc: "Refreshing beverages" },
                { title: "Fast Service", desc: "Quick delivery" },
                { title: "Luxury Dining", desc: "Premium ambiance" }
              ].map((item, i) => (
                <div className="service-card" key={`${index}-${i}`}>
                  <div className="icon-circle">🍽</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))
            )}

          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="reviews">
        <h2 className="reviews-title">Reviews</h2>
<p className="section-subtitle">Loved by stars and food lovers</p>

        <div className="review-container">

          {[
            { name: "Rambabu", review: "The food here has a rich authentic taste." },
            { name: "Sadhana", review: "Loved the ambiance and biryani!" },
            { name: "Sindhuja", review: "Stylish place with amazing food!" },
            { name: "Bhargavi", review: "Healthy and vegan options are great!" },
            { name: "SnehaLatha", review: "Warm and cozy place!" },
            { name: "Venkat",  review: "Powerful flavors!" },
            { name: "Pavan Kumar",  review: "Delicious and authentic flavors!" },
            { name: "Phani Kumar",  review: "Perfect blend of taste and class." },
            { name: "Kopila",  review: "Elegant and welcoming!" },
            { name: "Shiva",  review: "Great food and energy!" },
            { name: "Veena",  review: "Beautiful space and flavors." }
          ].map((item, i) => (
            <div className="review-card" key={i}>
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
              <p>"{item.review}"</p>
            </div>
          ))}

        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="newsletter">
        <div className="newsletter-image"></div>

       <div className="newsletter-content">
  <h2 className="newsletter-title">Subscribe Newsletter</h2>
  <p className="newsletter-subtitle">Get latest updates and offers</p>

  <div className="input-box">
    <input type="email" placeholder="Enter your email" />
    <button className="newsletter-btn">Submit</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AboutUs;