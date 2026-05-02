import React, { useState , useEffect } from "react";
import "./NonVeg.css";   // reuse same styling
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast } from "react-toastify";

function Soups() {

const soupItems = [

{
id:101,
name:"Tomato Basil Soup",
description:"Creamy tomato soup infused with fresh basil.",
price:149,
imageLoc:"/image/Tomato_Soup.jpg"
},
{
id:102,
name:"Sweet Corn Soup",
description:"Light and comforting sweet corn vegetable soup.",
price:169,
imageLoc:"/image/Sweetcorn.jpg"
},
{
id:103,
name:"Hot & Sour Soup",
description:"Classic Indo-Chinese spicy vegetable soup.",
price:179,
imageLoc:"/image/Hotsour.jpg"
},
{
id:104,
name:"Creamy Mushroom Soup",
description:"Rich mushroom soup blended with herbs.",
price:189,
imageLoc:"/image/mushrromsoup.jpg"
},
{
id:105,
name:"Pumpkin Cream Soup",
description:"Smooth pumpkin soup with mild spices.",
price:159,
imageLoc:"/image/pump.webp"
},
{
id:106,
name:"Broccoli Cheese Soup",
description:"Creamy broccoli soup topped with cheese.",
price:199,
imageLoc:"/image/bro.jpg"
},
{
id:107,
name:"Chicken Manchow Soup",
description:"Spicy chicken soup served with crispy noodles.",
price:219,
imageLoc:"/image/ChickenSoup.jpg"
},
{
id:108,
name:"Chicken Sweet Corn Soup",
description:"Chicken and corn soup loved by everyone.",
price:199,
imageLoc:"/image/Chickensweetcorn.jpg"
},
{
id:109,
name:"Mutton Shorba",
description:"Traditional mutton broth full of spices.",
price:249,
imageLoc:"/image/muttonshourba.jpg"
},
{
id:110,
name:"Chicken Clear Soup",
description:"Healthy clear chicken soup with herbs.",
price:179,
imageLoc:"/image/chi.jpg"
},
{
id:111,
name:"Prawn Lemon Soup",
description:"Tangy seafood soup with lemon flavour.",
price:229,
imageLoc:"/image/pra.webp"
},
{
id:112,
name:"Seafood Soup",
description:"Mixed seafood soup cooked with aromatic spices.",
price:269,
imageLoc:"/image/sea.jpg"
},
{
id:113,
name:"Spinach Almond Soup",
description:"Healthy spinach soup enriched with almonds.",
price:169,
imageLoc:"/image/spi.jpg"
},
{
id:114,
name:"Chicken Pepper Soup",
description:"Hot chicken broth flavored with black pepper.",
price:209,
imageLoc:"/image/chik.jpg"
},
{
id:115,
name:"Vegetable Clear Soup",
description:"Light vegetable broth perfect for starters.",
price:149,
imageLoc:"/image/veg.jpg"
}

];

 const dispatch = useDispatch();
  const itemsPerPage = 6;
  const totalPages = Math.ceil(soupItems.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser && loggedUser.favorites) setFavorites(loggedUser.favorites);
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  let currentItems = soupItems.slice(indexOfFirst, indexOfLast);

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

export default Soups;