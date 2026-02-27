import { useEffect, useState } from "react";

const useLocalStorage = (key, initial) => {
  const [ storage, setStorage ] = useState(JSON.parse(localStorage?.getItem(key)) ?? initial)

  const setLocalStorage = (formHandler) => {
    localStorage.setItem(key, JSON.stringify(formHandler(storage)))
    setStorage(formHandler(storage))
  }

  useEffect(() => {
    if (storage == null && initial != null) {
      setLocalStorage(() => initial)
    }
  }, [initial])

  const clearLocalStorage = () => {
    localStorage.clear()
  }

  return [ storage, setLocalStorage, clearLocalStorage ]


  
};

export default useLocalStorage;
