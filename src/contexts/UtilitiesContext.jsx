import { createContext, useContext } from "react";
import { formSchemas } from "../data/formSchemas";
import {
  State,
  onBorderError,
  handleState,
  validateForm,
} from "../utils/validation";

const UtilitiesContext = createContext();

export const UtilitiesContextProvider = ({ children }) => {
  const validationUtils = {
    onBorderError,
    validateForm,
    handleState,
    State,
  };

  return (
    <UtilitiesContext.Provider value={{ 
      formSchemas, validationUtils }}>
      {children}
    </UtilitiesContext.Provider>
  );
};

export const UtilsDB = () => {
  return useContext(UtilitiesContext);
};