import React from 'react';

export const Empty = (props) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "120vh",
    position: "relative", // Add a relative position to the container
  };

  const imageStyle = {
    width: "55%",
    height: "45%",
    left: "400%", 
  };

  const textStyle = {
    position: "absolute", // Add absolute position to the text
    top: "45%", // Adjust the top value to position the text closer to the image
    left: "45%", // Center the text horizontally
    transform: "translate(-50%, -50%)", // Center the text vertically
  };

  return (
    <div style={containerStyle}>
      <div className="relative h-72 w-72">
        <img
          alt="empty"
          src="/empty.png"
          style={imageStyle}
        />
      </div>
      <p className="text-muted-foreground text-sm text-center" style={textStyle}>
        No conversation yet!
      </p>
    </div>
  );
};
