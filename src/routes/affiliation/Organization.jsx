import { Outlet, useOutletContext } from "react-router";
import Header from "../../components/Header";
export default function Organization() {
  const { form, localStorage, clearLocalStorage, setLocalStorage, page, setPage, uploadFileData, files, setFiles } =
    useOutletContext();
  return (
    <div className="form-frame">
      <Outlet
        context={{
          form,
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
