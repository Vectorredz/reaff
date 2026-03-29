import { useContext } from "react";
import { FormContext } from "../contexts/FormContext"; 

export const useFormState = () => {
  const context = useContext();
  if (!context) {
    throw new Error("useFormState must be used within FormContextProvider");
  }
  return context;
};