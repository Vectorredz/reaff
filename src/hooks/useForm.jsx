import { useState, useEffect, useReducer } from "react";

import { produce } from "immer";

const setUpdate = (obj, path, update, array = false, action) => {
  return produce(obj, (draft) => {
    const keys = path.split(".");
    const lastKey = keys.pop();
    let current = draft;
    for (const key of keys) {
      if (!current[key]) current[key] = {};
      current = current[key];
    }
    if (!current[lastKey]) current[lastKey] = {};
    if (action === "status") {
      current[lastKey] = update
    }
    else if (action === "value") {
      if (!current?.[lastKey]["value"]) {
        current[lastKey]["value"] = array ? [] : {};
      } 
      current[lastKey].value = array ? [...current[lastKey].value, update] : update;
    }
  });
};

function validationReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      // console.log(action)
      return setUpdate(state, action.path, action.result, false, "status"); // result computed outside
    case "SUBMIT":
      return setUpdate(state, action.path, action.result, false, "status"); // same
    case "FORCE":
      return setUpdate(state, action.path, action.result, false, 
        "status");
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
        const current = path?.split(".").reduce((acc, key) => acc[key], prev);
        console.log('current', current)
        newValue = Array.isArray(current?.value)
          ? current?.value.includes(value)
            ? current?.value.filter((v) => v !== value)
            : [...current.value, value]
          : [value];
      }
      if (type === "radio") {
        newValue = id;
      }
      return setUpdate(
        prev,
        path,
        newValue,
        type === "array" ? true : false,
        "value",
      );
    });
  };

  return { values, setValues, validationState, dispatch, updateField };
}
