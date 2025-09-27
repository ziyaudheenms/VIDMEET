"use client"
import React from 'react'
import { format } from 'date-and-time';
function page() {
  // Inline styles for the container and date line
  const containerStyle = {
    minHeight: "100vh",
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(120deg, #6a11cb, #2575fc, #43cea2, #185a9d)",
    backgroundSize: "400% 400%",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    animation: "gradientBG 10s ease-in-out infinite",
  };

  const dateContainerStyle = {
    background: "rgba(255,255,255,0.15)",
    boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
    borderRadius: "20px",
    padding: "40px 60px",
    textAlign: "center",
    backdropFilter: "blur(8px)",
    color: "#fff",
    transition: "transform 0.5s cubic-bezier(.68,-0.55,.27,1.55), box-shadow 0.5s",
    willChange: "transform",
  };

  const dateLineStyle = {
    display: "inline-block",
    fontSize: "2.2rem",
    fontWeight: 700,
    letterSpacing: "1.5px",
    background: "linear-gradient(90deg, #fff 60%, #43cea2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    opacity: 1,
    animation: "fadeInUp 1s 0.2s forwards",
  };

  // Keyframes for animation (inject into a style tag)
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes gradientBG {
        0% {background-position: 0% 50%;}
        50% {background-position: 100% 50%;}
        100% {background-position: 0% 50%;}
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Get today's date in a nice format
  const today = new Date();
  const dateString = format(new Date(), 'dddd, MMMM DD YYYY');

  return (
    <div style={containerStyle}>
      <div style={dateContainerStyle}>
        <span style={dateLineStyle}>{dateString}</span>
      </div>
    </div>
  );
}

export default page