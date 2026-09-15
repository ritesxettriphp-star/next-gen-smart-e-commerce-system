import { useState } from "react";

function App() {

  const projectName = "Next-Gen Smart E-Commerce System";

  // ================= AUTH =================
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // ================= CART =================
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);

  // ================= PRODUCTS =================
  const products = [
    { id: 1, name: "Gaming Laptop", price: 150000, category: "Electronics", img: "https://via.placeholder.com/150" },
    { id: 2, name: "Smartphone", price: 80000, category: "Electronics", img: "https://via.placeholder.com/150" },
    { id: 3, name: "Nike Shoes", price: 12000, category: "Clothes", img: "https://via.placeholder.com/150" },
    { id: 4, name: "Burger Combo", price: 500, category: "Food", img: "https://via.placeholder.com/150" },
    { id: 5, name: "Football", price: 2000, category: "Sports", img: "https://via.placeholder.com/150" }
  ];

  const categories = ["All", "Electronics", "Clothes", "Food", "Sports"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ================= AUTH FUNCTION =================
  const handleAuth = () => {
    if (form.email && form.password) {
      setUser({ name: form.name || "User", email: form.email });
    } else {
      alert("Fill all fields");
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setIsLogin(true);
  };

  // ================= CART =================
  const addToCart = (p) => {
    setCart([...cart, p]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter(p => p.category === selectedCategory);

  // ================= LOGIN / REGISTER =================
  if (!user) {
    return (
      <div style={{
        fontFamily: "Arial",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#0f172a,#1e293b)"
      }}>

        <div style={{
          width: "360px",
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          textAlign: "center"
        }}>

          <h2>{projectName}</h2>
          <h3>{isLogin ? "Login" : "Register"}</h3>

          {!isLogin && (
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "90%", padding: "10px", margin: "8px" }}
            />
          )}

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ width: "90%", padding: "10px", margin: "8px" }}
          />

          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ width: "90%", padding: "10px", margin: "8px" }}
          />

          <button
            onClick={handleAuth}
            style={{
              width: "90%",
              padding: "10px",
              background: "#1d4ed8",
              color: "white",
              border: "none",
              borderRadius: "8px"
            }}
          >
            {isLogin ? "Login" : "Register"}
          </button>

          <p
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "#1d4ed8", cursor: "pointer" }}
          >
            {isLogin ? "Create account" : "Already have account?"}
          </p>

        </div>
      </div>
    );
  }

  // ================= DASHBOARD =================
  return (
    <div style={{ fontFamily: "Arial", background: "#f4f6fb", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <div style={{
        background: "linear-gradient(90deg,#0f172a,#1e293b)",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h3>🛒 {projectName}</h3>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{
            background: "#10b981",
            padding: "5px 10px",
            borderRadius: "20px"
          }}>
            Cart: {cart.length}
          </span>

          <button onClick={logout} style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "8px"
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* TITLE */}
      <h2 style={{ textAlign: "center", marginTop: "15px" }}>
        Welcome {user.name} 👋
      </h2>

      {/* CATEGORIES */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        flexWrap: "wrap"
      }}>
        {categories.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(c)}
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: "none",
              background: selectedCategory === c ? "#1d4ed8" : "#e2e8f0",
              color: selectedCategory === c ? "white" : "black"
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        padding: "20px"
      }}>
        {filtered.map((p) => (
          <div key={p.id} style={{
            background: "white",
            padding: "15px",
            borderRadius: "12px"
          }}>
            <img src={p.img} alt="" style={{ width: "100%", borderRadius: "10px" }} />

            <h3>{p.name}</h3>
            <p>Rs. {p.price}</p>

            <button
              onClick={() => addToCart(p)}
              style={{
                background: "#10b981",
                color: "white",
                border: "none",
                padding: "8px",
                borderRadius: "6px"
              }}
            >
              Add to Cart
            </button>

            <button
              onClick={() => removeFromCart(p.id)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "6px",
                borderRadius: "6px"
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div style={{
        background: "white",
        margin: "20px",
        padding: "15px",
        borderRadius: "12px"
      }}>
        <h3>🛒 Cart</h3>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item, i) => (
            <div key={i}>
              {item.name} - Rs. {item.price}
            </div>
          ))
        )}

        <h4>Total: Rs. {total}</h4>

        <button
          onClick={() => setCheckout(true)}
          style={{
            background: "#1d4ed8",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "8px"
          }}
        >
          Checkout
        </button>
      </div>

      {/* CHECKOUT */}
      {checkout && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px"
          }}>
            <h2>Order Confirmed 🎉</h2>
            <p>Total: Rs. {total}</p>

            <button onClick={() => {
              setCart([]);
              setCheckout(false);
            }}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;