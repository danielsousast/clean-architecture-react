import React from "react";

interface ComponentProps {
  type: string;
  name: string;
  placeholder: string;
}

const Input: React.FC<ComponentProps> = ({ type, name, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      style={{
        height: 30,
        marginBottom: 10,
      }}
    />
  );
};

export default Input;
