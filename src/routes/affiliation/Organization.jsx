import { Outlet, useOutletContext } from "react-router";

export default function Organization() {
  const { formData, setFormData, localStorage, setLocalStorage } =
    useOutletContext();
  return (
    <div className="form-frame">
      <Outlet 
        context={{
            formData,
            setFormData,
            localStorage,
            setLocalStorage
        }}/>
    </div>
  );
}
