import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ===== HERO SECTION ===== */}
     <section className="hero">
  <div className="hero-overlay">
    <h1>Experience the Art of Indian Cuisine</h1>
    <p>Where Tradition Meets Taste in Every Bite</p>

    {/* ✅ Button Wrapper Added */}
    <div className="hero-buttons">
      <div className="btn-bg"></div>

      <button onClick={() => navigate("/veg")}>
        Explore Menu
      </button>
    </div>

  </div>
</section>

      {/* ===== SECTION 1 (IMAGE LEFT) ===== */}
      <section className="split-section">
        <div className="split-image">
          <img src="/image/curry3.jpg" alt="Indian Food" />
        </div>

        <div className="split-content">
          <h2>Welcome to Sindhu's Restaurant</h2>
          <p>
            Discover the rich taste of Indian cuisine made with traditional
            spices and fresh ingredients. Every dish is crafted with passion
            and served with love.
          </p>
          <button onClick={() => navigate("/veg")}>
            Explore Veg Menu
          </button>
        </div>
      </section>

      {/* ===== SECTION 2 (IMAGE RIGHT) ===== */}
      <section className="split-section reverse">
        <div className="split-image">
          <img src="/image/curry.jpg" alt="Delicious Food" />
        </div>

        <div className="split-content">
          <h2>Authentic Taste Experience</h2>
          <p>
            From spicy curries to mouth-watering desserts, enjoy a journey of
            flavors that brings tradition and modern cooking together.
          </p>
          <button onClick={() => navigate("/nonveg")}>
            Explore Non-Veg
          </button>
        </div>
      </section>

      {/* ===== SECTION 3 (IMAGE LEFT) ===== */}
      <section className="split-section">
        <div className="split-image">
          <img src="/image/chef.jpg" alt="Chef Cooking" />
        </div>

        <div className="split-content">
          <h2>Crafted by Expert Chefs</h2>
          <p>
            Our chefs bring years of experience to create dishes that are both
            delicious and beautifully presented.
          </p>
          <button onClick={() => navigate("/desserts")}>
            View Desserts
          </button>
        </div>
      </section>

      {/* ===== FEATURED DISHES ===== */}
      <section className="featured">
        <h2>Restaurant's Famous & Special Dishes</h2>

        <div className="cards">
          <div className="card">
            <img src="/image/Mutton-Biryani.jpg" alt="" />
            <h3>Mutton Biryani</h3>
          </div>

          <div className="card">
            <img src="/image/PannerButterMasala.jpg" alt="" />
            <h3>Paneer Butter Masala</h3>
          </div>

          <div className="card">
            <img src="/image/gulab-jamuns.jpg" alt="" />
            <h3>Gulab Jamun</h3>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;