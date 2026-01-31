import Committee from "./concerns-pages/concerns";
import { useOutletContext, useNavigate } from "react-router";
import Header from "../../../components/Header.jsx";

export default function Concerns() {
  const Navigate = useNavigate();
  const { formData, setFormData, localStorage, setLocalStorage, page, setPage } =
    useOutletContext();
  return (
    <div className="form">
      <Header
        page={page}
        title={"Organization-related | Committee-specific Concerns"}
      ></Header>

      <Committee />

      <button
        className="btn-primary"
        onClick={(e) => {
          e.preventDefault();
          Navigate("../../create-account");
          setPage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
}
