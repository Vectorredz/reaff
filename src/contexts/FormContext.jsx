import { createContext, useContext } from "react";
import useForm from "../hooks/useForm";
import useLocalStorage from "../hooks/useLocalStorage";

export const FormContext = createContext();

export const FormContextProvider = ({ children, formTemplate }) => {
  const [localStorage, setLocalStorage, clearLocalStorage] = useLocalStorage(
    "form",
    formTemplate
  );

  const form = useForm(formTemplate, { setLocalStorage });

  return (
    <FormContext.Provider
      value={{
        form,
        localStorage,
        setLocalStorage,
        clearLocalStorage,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

