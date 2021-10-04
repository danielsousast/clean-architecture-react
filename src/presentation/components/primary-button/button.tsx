import React from "react";

const PrimaryButton: React.FC<any> = (props) => {
  return (
    <button
      {...props}
      style={{
        border: "none",
        height: 40,
        marginBottom: 10,
        backgroundColor: "#880e4f",
        outline: 0,
        color: "#fff",
        borderRadius: 4,
      }}
    >
      {props.title}
    </button>
  );
};

export default PrimaryButton;
