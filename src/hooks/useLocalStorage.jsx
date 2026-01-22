import { useState } from "react";

const useLocalStorage = (key, initial) => {
  const [ storage, setStorage ] = useState(JSON.parse(localStorage?.getItem(key)) ?? initial)

  const setLocalStorage = (form) => {
    localStorage.setItem(key, JSON.stringify(form(storage)))
    setStorage(form(storage))
  }

  return [ storage, setLocalStorage ]


  
};

export default useLocalStorage;
