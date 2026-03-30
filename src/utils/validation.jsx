import { formSchemas } from "../data/formSchemas";

// Export State constant
export const State = Object.freeze({
  EMPTY: "EMPTY",
  VALID: "VALID",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
});

// Export onBorderError function
export const onBorderError = (key, state) =>
  state?.[key]?.status === State.ERROR ? "text-field-error" : "text-field";

// Export handleState function
export const handleState = (state, key, value, path, ref = null) => {
  const item = path?.split(".").reduce((acc, key) => acc?.[key], formSchemas);
  if (ref === "") {
    return { status: State.EMPTY, error: "Must be nonempty value." };
  } else if (ref) {
    return { status: State.VALID, error: "" };
  }

  if (!value || value.length <= 0) {
    return { status: State.EMPTY, error: "This field is required." };
  }
  if (item?.pattern && !item.pattern.test(value)) {
    return { status: State.ERROR, error: item.error };
  }
  return { status: State.VALID, error: "" };
};

// Export validateForm function
export const validateForm = (form, subpath) => {
  let complete = true;
  const state = subpath
    .split(".")
    .reduce((acc, key) => acc?.[key], formSchemas);
  const values = subpath
    .split(".")
    .reduce((acc, key) => acc?.[key], form.values);

  const validateField = (key, value, fieldSchema, path) => {
    if (!fieldSchema.required) return;
    const result = handleState(form, key, value, path);
    if (result.status !== State.VALID) {
      complete = false;
    }
    if (result.status === State.EMPTY) result.status = State.ERROR;
    form.dispatch({ type: "SUBMIT", path, result });
  };

  Object.entries(state).forEach(([key, item]) => {
    if (key === "title") return;
    if ("required" in item) {
      validateField(key, values?.[key], item, `${subpath}.${key}`);
    } else {
      console.log("test", item);
      Object.entries(item).forEach(([childKey, childItem]) => {
        if (key === "title" || typeof childItem !== "object") return;
        if ("required" in childItem) {
          validateField(
            childKey,
            values?.[key]?.[childKey],
            childItem,
            `${subpath}.${key}.${childKey}`,
          );
        }
      });
    }
  });
  console.log(complete);

  return complete;
};
