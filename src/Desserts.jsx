import React,{useState , useEffect } from "react";
import "./Veg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast} from "react-toastify";

function Desserts(){

const desserts=[
{ id:401,name:"Gulab Jamun",description:"Soft milk dumplings soaked in sugar syrup.",price:129,imageLoc:"/image/gulab-jamuns.jpg"},
{ id:402,name:"Rasmalai",description:"Paneer discs soaked in saffron milk.",price:149,imageLoc:"/image/Rasmalai.webp"},
{ id:403,name:"Chocolate Brownie",description:"Warm rich chocolate brownie.",price:179,imageLoc:"/image/chocolate.jpg"},
{ id:404,name:"Ice Cream Sundae",description:"Vanilla ice cream topped with chocolate.",price:159,imageLoc:"/image/ice-cream.jpg"},
{ id:405,name:"Kunafa",description:"Crispy filo pastry layered with cheese.",price:249,imageLoc:"/image/kunafa.webp"},
{ id:406,name:"Cheesecake",description:"Creamy baked cheesecake dessert.",price:219,imageLoc:"/image/cheesecake.jpg"},
{ id:407,name:"Tiramisu",description:"Italian coffee flavored dessert.",price:259,imageLoc:"/image/tira.jpg"},
{ id:408,name:"Red Velvet Cake",description:"Soft red velvet cake with cream cheese.",price:199,imageLoc:"/image/red.jpg"},
{ id:409,name:"Chocolate Lava Cake",description:"Molten chocolate cake served warm.",price:229,imageLoc:"/image/lava.jpg"},
{ id:410,name:"Fruit Custard",description:"Fresh fruits in creamy custard.",price:159,imageLoc:"/image/cus.jpg"},
{ id:411,name:"Mango Delight",description:"Mango flavored creamy dessert.",price:189,imageLoc:"/image/man.webp"},
{ id:412,name:"Caramel Pudding",description:"Soft pudding topped with caramel.",price:169,imageLoc:"/image/car.avif"}
];

const dispatch = useDispatch();
  const itemsPerPage = 6;
  const totalPages = Math.ceil(desserts.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser && loggedUser.favorites) setFavorites(loggedUser.favorites);
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  let currentItems = desserts.slice(indexOfFirst, indexOfLast);

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

export default Desserts;