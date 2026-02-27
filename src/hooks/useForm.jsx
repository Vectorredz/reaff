import { useState, useEffect, useReducer } from "react";

import { produce } from "immer";

const setUpdate = (obj, path, update, array = false) => {
  return produce(obj, (draft) => {
    const keys = path.split(".");
    const lastKey = keys.pop();
    let current = draft;
    for (const key of keys) {
      if (!current[key]) current[key] = {};
      current = current[key];
    }
    current[lastKey] = array ? [...current[lastKey], update] : update;
  });
};

function validationReducer(state, action) {
  // console.log(state, action)
  switch (action.type) {
    case "CHANGE":
      return setUpdate(state, action.path, action.result); // result computed outside
    case "SUBMIT":
      return setUpdate(state, action.path, action.result); // same
    case "FORCE":
      return setUpdate(state, action.path, action.result);
    default:
      return state;
  }
}

export default function useForm(initialData, storageHook) {
  const [values, setValues] = useState(initialData);
  const [validationState, dispatch] = useReducer(validationReducer, {});

  useEffect(() => {
    if (values && storageHook?.setLocalStorage) {
      storageHook.setLocalStorage(() => values);
    }
  }, [values]);

  useEffect(() => {
    if (initialData && !values) setValues(initialData);
  }, [initialData]);

  const updateField = ({ path, value, id, type }) => {
    setValues((prev) => {
      if (!prev) return prev;
      let newValue = value;
      if (type === "checkbox") {
        const current = path.split(".").reduce((acc, key) => acc[key], prev);
        newValue = Array.isArray(current)
          ? current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value]
          : [value];
      }
      if (type === "radio") {
        newValue = id;
      }
      return setUpdate(prev, path, newValue, type === "array" ? true : false);
    });
  };

  return { values, setValues, validationState, dispatch, updateField };
}
