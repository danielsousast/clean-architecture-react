import React from "react";

const LinkButton: React.FC<any> = (props) => {
  return (
    <button
      {...props}
      style={{
        border: "none",
        height: 40,
        marginBottom: 10,
        backgroundColor: "#fff",
        outline: 0,
        color: "#880e4f",
        borderRadius: 4,
      }}
    >
      {props.title}
    </button>
  );
};

export default LinkButton;
