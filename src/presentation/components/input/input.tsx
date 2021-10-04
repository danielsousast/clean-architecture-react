import formContext from "@/presentation/contexts/form/form-context";
import React, { useContext } from "react";

interface ComponentProps {
  type: string;
  name: string;
  placeholder: string;
}

const Input: React.FC<ComponentProps> = ({ type, name, placeholder }) => {
  const { state, setState } = useContext(formContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <input
      onChange={handleChange}
      type={type}
      name={name}
      placeholder={placeholder}
      data-testid={name}
      style={{
        height: 30,
        marginBottom: 10,
      }}
    />
  );
};

export default Input;
