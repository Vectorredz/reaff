export default function Footer({validateForm, clearLocalStorage, Navigate, nextPage}) {
    return (
        <div>
            <div className="flex justify-between items-center pt-6 border-t border-gray-300">
          <button
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              if (validateForm()) {
                Navigate(`/signup/${nextPage}`);
              }
            }}
          >
            Next
          </button>

          <span className="text-sm text-gray-500">
            Please review before proceeding
          </span>

          <button
            className="btn-clear"
            onClick={(e) => {
              e.preventDefault();
              clearLocalStorage();
              Navigate(`/signup/`)
              window.location.reload();
            }}
          >
            Clear Form
          </button>
        </div>
        </div>
    )
}