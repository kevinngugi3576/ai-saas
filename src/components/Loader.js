import React from 'react';

export const Loader = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "20vh",
  };

  const imageStyle = {
    width: "80px", // Adjust the width as needed
    height: "75px", // Adjust the height as needed
  };

  return (
    <div style={containerStyle}>
      <div
        className="flex flex-col items-center justify-center"
        style={{
           // Optional: Add a semi-transparent background
          width: '100px', // Adjust the width of the container as needed
          height: '100px', // Adjust the height of the container as needed
        }}
      >
        <div
          style={{
            borderTopColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: "#000045",
          }}
        >
          <img
            alt="logo"
            src="/logo.png"
            style={imageStyle} // Apply the custom image style
            className="w-full h-full animate-spin-slow"
          />
        </div>
        <p className="text-sm text-muted-foreground">AI is Thinking</p>
      </div>
    </div>
  );
};
