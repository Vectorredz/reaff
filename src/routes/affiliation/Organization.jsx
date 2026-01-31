import { Outlet, useOutletContext } from "react-router";
import Header from "../../components/Header";
export default function Organization() {
  const { formData, setFormData, localStorage, setLocalStorage, page, setPage } =
    useOutletContext();
  return (
    <div className="form-frame">
      <Outlet
        context={{
          formData,
          setFormData,
          localStorage,
          setLocalStorage,
          page,
          setPage,
        }}
      />
    </div>
  );
}
