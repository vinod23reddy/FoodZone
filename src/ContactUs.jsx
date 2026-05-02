import React from "react";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div className="contact-page">

      {/* HERO SECTION */}
      <div className="contact-hero">
        <div className="contact-overlay">
          <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">We’d love to hear from you</p>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="contact-main">

        {/* LEFT SIDE */}
        <div className="contact-left">

          <div className="info-card">
            <h3>📞 Phone</h3>
            <p>+91 79811 77389</p>
          </div>

          <div className="info-card">
            <h3>💬 WhatsApp</h3>
            <p>+91 79811 77389</p>
          </div>

          <div className="info-card">
            <h3>📧 Email</h3>
            <p>sindhusrestaurant@gmail.com</p>
          </div>

          <div className="info-card">
            <h3>🏪 Our Shop</h3>
            <p>Hyderabad, Telangana</p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="contact-right">

          <h2 className="contact-form-title">Get In Touch</h2>
          <p className="contact-form-subtitle">Feel free to contact us anytime</p>

          <form className="contact-form">

            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Message"></textarea>

            <button type="submit">Send Now</button>

          </form>

        </div>

      </div>

      {/* MAP */}
      <div className="map-section">
        <iframe
          src="https://www.google.com/maps?q=Hyderabad&output=embed"
          title="map"
        ></iframe>
      </div>

      <div className="footer">

  <div className="footer-container">

    {/* LEFT */}
    <div className="footer-box">
      <h3>🍽 Sindhu's Restaurant</h3>
      <p>
        Serving authentic Hyderabadi flavors with love. From rich biryanis
        to delicious curries, we bring the true taste of Hyderabad to your plate.
      </p>
    </div>

    {/* OUR MENU */}
    <div className="footer-box">
      <h4>Our Specialities</h4>
      <p>Hyderabadi Biryani</p>
      <p>Chicken Haleem</p>
      <p>Mutton Curry</p>
      <p>Double Ka Meetha</p>
    </div>

    {/* LINKS */}
    <div className="footer-box">
      <h4>Quick Links</h4>
      <p>Home</p>
      <p>About Us</p>
      <p>Menu</p>
      <p>Contact</p>
    </div>

    {/* CONTACT */}
    <div className="footer-box">
      <h4>Get In Touch</h4>
      <p>📍 Hyderabad, Telangana</p>
      <p>📞 +91 79811 77389</p>
      <p>📧 sindhusrestaurant@gmail.com</p>
      <p>📸 Instagram: @sindhusrestaurant</p>
    </div>

  </div>

  <div className="footer-bottom">
    <p>© 2025 Sindhu's Restaurant | Taste of Hyderabad</p>
  </div>

</div>

    </div>
  );
}

export default ContactUs;