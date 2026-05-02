import React from 'react';

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        color: "#333",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px"
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          color: "#dc3545",
          marginBottom: "10px"
        }}
      >
        404 - Page Not Found
      </h1>

      <h3
        style={{
          fontSize: "1.5rem",
          marginBottom: "20px",
          color: "#6c757d"
        }}
      >
        The page you are looking for does not exist.
      </h3>

      <img
        src="/image/404-error.webp"
        alt="404 Error"
        style={{
          maxWidth: "90%",
          height: "auto",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}
      />

      <a
        href="/home"
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          backgroundColor: "#ffc107",
          color: "#000",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "600",
          transition: "background-color 0.3s ease"
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#e0a800")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ffc107")}
      >
        Go Back Home
      </a>
    </div>
  );
}

export default NotFound;
