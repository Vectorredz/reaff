import { useState } from "react";

const useLocalStorage = (key, initial) => {
  const [ storage, setStorage ] = useState(JSON.parse(localStorage?.getItem(key)) ?? initial)

  const setLocalStorage = (formHandler) => {
    localStorage.setItem(key, JSON.stringify(formHandler(storage)))
    setStorage(formHandler(storage))
  }

  return [ storage, setLocalStorage ]


  
};

export default useLocalStorage;
