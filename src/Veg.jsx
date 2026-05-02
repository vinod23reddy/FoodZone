import React, { useState , useEffect } from "react";
import "./NonVeg.css";   // reuse same styling
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast } from "react-toastify";

function Veg() {
    
  const vegItems = [
    {
      id: 201,
      name: "Paneer Butter Masala",
      imageLoc: "/image/PannerButterMasala.jpg",
      price: 220,
      description: "Rich and creamy tomato gravy cooked with soft paneer cubes."
    },
    {
      id: 202,
      name: "Veg Biryani",
      imageLoc: "/image/vegetableBiriyani.jpg",
      price: 180,
      description: "Aromatic basmati rice cooked with fresh vegetables and spices."
    },
    {
      id: 203,
      name: "Chole Bhature",
      imageLoc: "/image/chole.jpg",
      price: 150,
      description: "Spicy chickpea curry served with fluffy fried bhature."
    },
    {
      id: 204,
      name: "Vegetable Pulao",
      imageLoc: "/image/Vegetable.pulav.jpg",
      price: 160,
      description: "Flavorful rice dish mixed with seasonal vegetables and herbs."
    },
    {
      id: 205,
      name: "Veg Kofta Curry",
      imageLoc: "/image/vegkofta.jpg",
      price: 240,
      description: "Soft vegetable dumplings cooked in rich creamy gravy."
    },
    {
      id: 206,
      name: "Dal Makhani",
      imageLoc: "/image/dalmakani.jpg",
      price: 190,
      description: "Slow cooked black lentils in creamy buttery gravy."
    },
    {
      id: 207,
      name: "Paneer Tikka",
      description: "Paneer cubes marinated in yogurt and grilled.",
      price: 249,
      imageLoc: "/image/paneer-tikka.jpg"
    },
    {
      id: 208,
      name: "Veg Spring Rolls",
      description: "Crispy rolls stuffed with vegetables.",
      price: 199,
      imageLoc: "/image/Vegspring.jpg"
    },
    {
      id: 209,
      name: "Hara Bhara Kabab",
      description: "Spinach and green pea patties shallow fried.",
      price: 189,
      imageLoc: "/image/Hara-Bhara.webp"
    },
    {
      id: 210,
      name: "Crispy Corn",
      description: "Golden fried sweet corn tossed with spices.",
      price: 179,
      imageLoc: "/image/crispy-corn.jpg"
    },
    {
      id: 211,
      name: "Veg Manchurian",
      description: "Vegetable dumplings in spicy Indo-Chinese sauce.",
      price: 219,
      imageLoc: "/image/veg-manchurian.jpg"
    },
    {
      id: 212,
      name: "Cheese Balls",
      description: "Crispy fried cheese balls served with dip.",
      price: 229,
      imageLoc: "/image/veg-cheese-balls.jpg"
    }
  ];

  const dispatch = useDispatch();
    const itemsPerPage = 6;
    const totalPages = Math.ceil(vegItems.length / itemsPerPage);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const [filter, setFilter] = useState("ALL");
  
    useEffect(() => {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      if (loggedUser && loggedUser.favorites) setFavorites(loggedUser.favorites);
    }, []);
  
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    let currentItems = vegItems.slice(indexOfFirst, indexOfLast);
  
    if (filter === "LOW") currentItems = currentItems.filter(item => item.price < 200);
    else if (filter === "HIGH") currentItems = currentItems.filter(item => item.price >= 200);
  
    const handleFavorite = (itemName) => {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      if (!loggedUser) {
        toast.warning("⚠️ Please login to add favorites");
        return;
      }
      const updatedFavorites = [...favorites, itemName];
      setFavorites(updatedFavorites);
      loggedUser.favorites = updatedFavorites;
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      toast.success(`${itemName} added to favorites`);
    };
  
    return (
      <div className="container">
  
        {/* Filter Buttons */}
       <div className="filter-buttons">
  <button
    className={filter === "ALL" ? "active" : ""}
    onClick={() => setFilter("ALL")}
  >
    All
  </button>
  <button
    className={filter === "LOW" ? "active" : ""}
    onClick={() => setFilter("LOW")}
  >
    Below ₹200
  </button>
  <button
    className={filter === "HIGH" ? "active" : ""}
    onClick={() => setFilter("HIGH")}
  >
    ₹200 & Above
  </button>
</div>

  
        <div className="card-row">
          {currentItems.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.imageLoc} alt={item.name} />
              <div className="card-body">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h4 className="price">₹{item.price}</h4>
  
                 <div className="action-buttons">

                          <button
                            className="order-btn"
                            onClick={() => {
                              dispatch(addToCart(item));
                              toast.success(`${item.name} added to cart`);
                            }}
                          >
                            Add To Cart
                          </button>

                          <button
                            className={`fav-btn ${favorites.includes(item.name) ? "active" : ""}`}
                            onClick={() => handleFavorite(item.name)}
                          >
                            {favorites.includes(item.name) ? "★" : "☆"}
                          </button>

                        </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Pagination */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>←</button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)}
              style={{ margin: "0 6px", backgroundColor: currentPage === index + 1 ? "#ff5722" : "#eee", color: currentPage === index + 1 ? "white" : "black", padding: "6px 12px", border: "none", borderRadius: "6px", cursor: "pointer" }}>
              {index + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>→</button>
        </div>
      </div>
    );
  }
  

export default Veg;