import { Outlet, useOutletContext } from "react-router";
import Header from "../../components/Header";
export default function Organization() {
  const { form, formData, setFormData, localStorage, clearLocalStorage, setLocalStorage, page, setPage, uploadFileData, files, setFiles } =
    useOutletContext();
  return (
    <div className="form-frame">
      <Outlet
        context={{
          form,
          formData,
          setFormData,
          localStorage,
          clearLocalStorage,
          setLocalStorage,
          page,
          setPage,
          uploadFileData,
          files,
          setFiles
        }}
      />
    </div>
  );
}
