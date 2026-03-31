import { useNavigate } from "react-router";
import { UserDB } from "../contexts/DatabaseContext";
export default function UpdateForm() {  
  const { updateAnswersData } = UserDB()
  return (
    <div>
        <button
          className="btn-primary"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
            window.location.reload();
            updateAnswersData()
          }}
        >
          Update Form
        </button>
    
        <button
          className="btn-clear"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
            window.location.reload();
          }}
        >
          Reset Changes
        </button>
      </div>
  );
}
