import React, { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Lookup table for dish images
  const allItems = [
    { name: "Paneer Butter Masala", imageLoc: "/image/PannerButterMasala.jpg", category: "veg" },
    { name: "Veg Biryani", imageLoc: "/image/vegetableBiriyani.jpg", category: "veg" },
    { name: "Chole Bhature", imageLoc: "/image/chole.jpg", category: "veg" },
    { name: "Vegetable Pulao", imageLoc: "/image/Vegetable.pulav.jpg", category: "veg" },
    { name: "Dal Makhani", imageLoc: "/image/dalmakani.jpg", category: "veg" },
    { name: "Paneer Tikka", imageLoc: "/image/paneer-tikka.jpg", category: "veg" },
    { name: "Veg Spring Rolls", imageLoc: "/image/Vegspring.jpg", category: "snacks" },
    { name: "Hara Bhara Kabab", imageLoc: "/image/Hara-Bhara.webp", category: "snacks" },
    { name: "Crispy Corn", imageLoc: "/image/crispy-corn.jpg", category: "snacks" },
    { name: "Veg Manchurian", imageLoc: "/image/veg-manchurian.jpg", category: "chinese" },
    { name: "Cheese Balls", imageLoc: "/image/veg-cheese-balls.jpg", category: "snacks" },
    { name: "Chocolate Brownie", imageLoc: "/image/chocolate.jpg", category: "dessert" },
    { name: "Ice Cream Sundae", imageLoc: "/image/ice-cream.jpg", category: "dessert" },
    { name: "Kunafa", imageLoc: "/image/kunafa.webp", category: "dessert" },
    { name: "Cheesecake", imageLoc: "/image/cheesecake.jpg", category: "dessert" },
    { name: "Virgin Mojito", imageLoc: "/image/Virgin Mojito.jpg", category: "mocktail" },
    { name: "Strawberry Lemonade", imageLoc: "/image/strawberry-lemonade.jpg", category: "mocktail" },
    { name: "Blue Lagoon", imageLoc: "/image/blue-lagoon.jpg", category: "mocktail" }
  ];

  const getItemImage = (itemName) => {
  const found = allItems.find((i) => i.name === itemName);
  return found ? found.imageLoc : "/image/default-food.png";
};


  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      setUser(loggedUser);

      const favs = Array.isArray(loggedUser.favorites) ? loggedUser.favorites : [];
      setFavorites(favs);

      // Recommendations based on favorites
      const favCategories = favs.map(fav => {
        const item = allItems.find(i => i.name === fav);
        return item ? item.category : null;
      }).filter(Boolean);

      let recs = allItems.filter(item =>
        favCategories.includes(item.category) &&
        !favs.includes(item.name)
      );

      if (recs.length === 0) {
        recs = allItems.slice(0, 4); // fallback
      }

      setRecommendations(recs.slice(0, 6));
    }
  }, []);

  return (
    <div className="profile-container">
      {user ? (
        <>
          <h2 className="profile-title">👤 {user.fullname}'s Profile</h2>

          {/* Customer Details */}
          <div className="profile-details">
            <img
              src={user.photo || "/image/default-user.png"}
              alt="Profile"
              className="profile-photo"
            />
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile || "Not provided"}</p>
            <p><strong>Registered:</strong> {user.registeredAt || "Unknown"}</p>
          </div>

          {/* Favorites Section */}
{/* Favorites Section */}
<div className="favorites-section">
  <h3>⭐ Favorite Dishes</h3>
  {favorites.length > 0 ? (
    <div className="favorites-grid">
      {favorites.map((fav, idx) => {
        const favName = typeof fav === "string" ? fav : fav.name;

        const handleToggleFavorite = () => {
          let updatedFavorites;
          if (favorites.includes(favName)) {
            updatedFavorites = favorites.filter(f => f !== favName);
          } else {
            updatedFavorites = [...favorites, favName];
          }
          setFavorites(updatedFavorites);

          // Update localStorage
          const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};
          loggedUser.favorites = updatedFavorites;
          localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        };

        return (
          <div key={idx} className="favorite-card">
            <img src={getItemImage(favName)} alt={favName} />
            <p>{favName}</p>
            <button
                className={`fav-btn ${favorites.includes(favName) ? "remove" : "add"}`}
                onClick={handleToggleFavorite}
              >
                {favorites.includes(favName) ? "❌ Remove Favorite" : "⭐ Add Favorite"}
              </button>
          </div>
        );
      })}
    </div>
  ) : (
    <p>No favorites added yet.</p>
  )}
</div>


          {/* Recommendations Section */}
          <div className="recommendations-section">
            <h3>✨ Recommended for You</h3>
            {recommendations.length > 0 ? (
              <div className="favorites-grid">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="favorite-card">
                    <img src={rec.imageLoc} alt={rec.name} />
                    <p>{rec.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recommendations available.</p>
            )}
          </div>
        </>
      ) : (
        <h2>Please login to view your profile.</h2>
      )}
    </div>
  );
}

export default Profile;
