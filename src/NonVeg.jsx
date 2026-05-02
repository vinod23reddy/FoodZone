import React, { useState , useEffect } from "react";
import "./NonVeg.css";   // reuse same styling
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast } from "react-toastify";

function NonVeg() {
  

  // Example lookup table for non‑veg dishes
  const nonVegItems = [
    {
      id: 301,
      name: "Mutton Rogan Josh",
      price: 499,
      description: "Rich mutton curry with aromatic spices.",
      imageLoc: "/image/muttonshourba.jpg"
    },
    {
      id: 302,
      name: "Prawn Fried Rice",
      price: 349,
      description: "Rice tossed with prawns and veggies.",
      imageLoc: "/image/prawn-fried.webp"
    },
    {
      id: 303,
      name: "Egg Curry",
      price: 199,
      description: "Boiled eggs in spicy gravy.",
      imageLoc: "/image/eggcurry.jpg"
    },
    {
      id: 304,
      name: "Chicken Curry",
      price: 399,
      description: "Tender chicken pieces simmered in spicy curry gravy.",
      imageLoc: "/image/Chickencurry.jpg"
    },
    {
      id: 305,
      name: "Mutton Biryani",
      price: 499,
      description: "Aromatic basmati rice cooked with juicy mutton pieces and spices.",
      imageLoc: "/image/Mutton-Biryani.jpg"
    },
    {
      id: 306,
      name: "Fish Pulusu",
      price: 449,
      description: "Fresh fish cooked in traditional Indian curry.",
      imageLoc: "/image/Fishpulusu.jpg"
    },
    {
      id: 307,
      name: "Chicken Tikka",
      description: "Tender chicken pieces marinated in yogurt and spices.",
      price: 299,
      imageLoc: "/image/ChickenTikka.jpg"
    },
    {
      id: 308,
      name: "Chicken Lollipop",
      description: "Crispy fried chicken wings tossed in spicy sauce.",
      price: 279,
      imageLoc: "/image/chicken-lollipop.jpg"
    },
    {
      id: 309,
      name: "Mutton Seekh Kebab",
      description: "Juicy minced mutton kebabs with aromatic spices.",
      price: 349,
      imageLoc: "/image/Mutton-Seekh-Kebab.jpg"
    },
    {
      id: 310,
      name: "Fish Fingers",
      description: "Golden fried fish strips served with sauce.",
      price: 319,
      imageLoc: "/image/Fish-Fingers.webp"
    },
    {
      id: 311,
      name: "Prawn Tempura",
      description: "Crispy battered prawns served with dipping sauce.",
      price: 399,
      imageLoc: "/image/shrimp-tempura.jpg"
    },
    {
      id: 312,
      name: "Chicken 65",
      description: "Spicy deep-fried chicken tossed with curry leaves.",
      price: 289,
      imageLoc: "/image/chicken-65.jpg"
    }
  ];

 const dispatch = useDispatch();
     const itemsPerPage = 6;
     const totalPages = Math.ceil(nonVegItems.length / itemsPerPage);
   
     const [currentPage, setCurrentPage] = useState(1);
     const [favorites, setFavorites] = useState([]);
     const [filter, setFilter] = useState("ALL");
   
     useEffect(() => {
       const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
       if (loggedUser && loggedUser.favorites) setFavorites(loggedUser.favorites);
     }, []);
   
     const indexOfLast = currentPage * itemsPerPage;
     const indexOfFirst = indexOfLast - itemsPerPage;
     let currentItems = nonVegItems.slice(indexOfFirst, indexOfLast);
   
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

export default NonVeg;