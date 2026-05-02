import React, { useState , useEffect} from "react";
import "./Veg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast } from "react-toastify";

function Mocktails() {

const mocktails = [
{
id:501,
name:"Virgin Mojito",
description:"Refreshing mint lime soda drink.",
price:149,
imageLoc:"/image/Virgin Mojito.jpg"
},
{
id:502,
name:"Pineapple Punch",
description:"Sweet pineapple drink with citrus flavor.",
price:169,
imageLoc:"/image/pineapple-punch.webp"
},
{
id:503,
name:"Strawberry Lemonade",
description:"Fresh strawberries mixed with lemonade.",
price:159,
imageLoc:"/image/strawberry-lemonade.jpg"
},
{
id:504,
name:"Blue Lagoon",
description:"Tropical blue citrus drink served chilled.",
price:179,
imageLoc:"/image/blue-lagoon.jpg"
},
{
id:505,
name:"Mango Mule",
description:"Mango juice with ginger and lime twist.",
price:189,
imageLoc:"/image/mango-mule.jpg"
},
{
id:506,
name:"Cucumber Cooler",
description:"Mint and cucumber refreshing cooler.",
price:149,
imageLoc:"/image/cucumber-cooler.jpg"
},
{
id:507,
name:"Watermelon Splash",
description:"Fresh watermelon juice with mint.",
price:169,
imageLoc:"/image/wat.jpg"
},
{
id:508,
name:"Kiwi Delight",
description:"Tangy kiwi mocktail with soda fizz.",
price:179,
imageLoc:"/image/ki.avif"
},
{
id:509,
name:"Orange Sunrise",
description:"Orange juice layered with grenadine.",
price:159,
imageLoc:"/image/ora.jpg"
},
{
id:510,
name:"Mint Lime Soda",
description:"Classic Indian refreshing soda drink.",
price:139,
imageLoc:"/image/lem.webp"
},
{
id:511,
name:"Berry Blast",
description:"Mixed berry refreshing mocktail.",
price:189,
imageLoc:"/image/be1.webp"
},
{
id:512,
name:"Apple Cooler",
description:"Fresh apple juice mixed with soda.",
price:159,
imageLoc:"/image/app.jpg"
}
];

const dispatch = useDispatch();
  const itemsPerPage = 6;
  const totalPages = Math.ceil(mocktails.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser && loggedUser.favorites) setFavorites(loggedUser.favorites);
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  let currentItems = mocktails.slice(indexOfFirst, indexOfLast);

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

export default Mocktails;