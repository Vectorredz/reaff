import { useNavigate } from "react-router";

export default function Footer({
  validateForm,
  clearLocalStorage,
  prevPage,
  nextPage,
  details,
}) {
  const Navigate = useNavigate();
  
  return (
    <div>
      <div className="flex justify-between items-center pt-6 border-t border-gray-300">
        <button
          className="btn-clear"
          onClick={(e) => {
            e.preventDefault();
            clearLocalStorage();
            window.scrollTo(0, 0);
            Navigate(`/signup/`);
            window.location.reload();
          }}
        >
          Clear Form
        </button>

        <span className="text-sm text-gray-500">
          Please review before proceeding
        </span>
        <div className="flex gap-4">
          { prevPage &&
            <button
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo(0, 0);
                Navigate(`/signup/${prevPage}`);
              }}
            >
              Prev
            </button>
          }
          <button
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              console.log('footer',details[0])
              if (validateForm && validateForm(details[0], details[1])) {
                window.scrollTo(0, 0);
                Navigate(`/signup/${nextPage}`);
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
