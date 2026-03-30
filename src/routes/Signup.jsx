import "../styles/index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserAuth } from "../contexts/AuthContext.jsx";
import { UserDB } from "../contexts/DatabaseContext.jsx";
import { toast } from "react-toastify";
import { Outlet } from "react-router";
import ProgressBar from "../components/ProgressBar.jsx";
import Modal from "../components/Modal.jsx";
import { FormContextProvider, UserContext } from "../contexts/FormContext.jsx";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUpNewUser, removeUser } = UserAuth();
  const {
    fetchFormTemplate,
    insertMemberData,
    insertAnswersData,
    uploadFileData,
  } = UserDB();
  const { form } = UserContext();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [formTemplate, setFormTemplate] = useState(null);
  const [page, setPage] = useState(1);
  const [files, setFiles] = useState({
    form5: { file: null, id: null },
    upid: { file: null, id: null },
    picture: { file: null, id: null },
    resume: { file: null, id: null },
  });
  const Navigate = useNavigate();

  async function handleFetchForm() {
    setLoading(true);
    const { data, error } = await fetchFormTemplate();
    if (error) {
      toast.error("Failed to fetch form template.");
      console.error("Error fetching form template:", error);
      setLoading(false);
      return;
    }
    toast.loading("fetching form...", { toastId: "form" });
    setFormTemplate(data);
    setLoading(false);
  }

  useEffect(() => {
    handleFetchForm();
  }, []);

  useEffect(() => {
    if (loading) toast.loading("fetching form...", { toastId: "form" });
    else toast.dismiss("form");
  }, [loading]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    let user = null;
    try {
      const userResult = await signUpNewUser(email, password);
      if (userResult.error) throw userResult.error;
      if (!userResult.error && userResult.data && userResult.success) {
        user = userResult?.data?.user;
        for (const key in files) {
          const fileObj = files[key];
          if (fileObj?.file) await uploadFileData(user, key, fileObj.file);
        }
        const memberResults = await insertMemberData(user, form?.values, email);
        if (memberResults.error) throw memberResults.error;
        const answerResults = await insertAnswersData(
          user,
          form?.values,
          formTemplate?.data?.id,
        );
        if (answerResults.error) throw answerResults.error;

        toast.success("Successfully created the")

        setTimeout(() => Navigate("/"), 1000);
      }
    } catch (error) {
      console.log(error);
      if (error?.code === "23505") {
        toast.error("An account with same student number already exists.");
        const res = await removeUser(user);
        console.log(res);
      }
      console.error(error.message);
    }
  };

  const steps = [
    {
      label: "Welcome",
      content: (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              UP ACM Affiliation Form
            </h1>
            <p className="description-text">
              Thank you for your interest in renewing your membership for UP ACM
              this year. We're excited to have a fruitful semester with you as
              we gradually move our activities F2F. Let's continue to build
              communities together!
            </p>
          </div>

          <div className="form-section space-y-2">
            <p className="question-text">As an active member, you must:</p>
            <ol className="space-y-1">
              {[
                "Do the committee tasks assigned by the committee head",
                "Participate in any or all internal and external events",
                "Pay membership fee",
                "Attend in all committee meetings called by the committee head",
                "Attend in all GA, and understand and abide the constitution",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 description-text">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <p className="description-text">
            Committing reaffirmation means agreeing with all of the above
            responsibilities. This form is to be done <strong>once only</strong>{" "}
            and will take 15–20 minutes.
          </p>
          <button
            className="btn-primary self-start"
            onClick={() => setIndex(1)}
          >
            Read the preamble →
          </button>
        </div>
      ),
    },
    {
      label: "Preamble",
      content: (
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="section-title">Preamble</h2>
            <p className="description-text">
              Please read the preamble carefully before proceeding.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <img src="preamble.jpg" className="w-full" alt="Preamble" />
          </div>
          <button
            className="btn-primary self-start"
            onClick={() => setIndex(2)}
          >
            Proceed to data privacy →
          </button>
        </div>
      ),
    },
    {
      label: "Data Privacy",
      content: (
        <div className="flex flex-col gap-6 h-full">
          <div>
            <h2 className="section-title">Data Privacy Declaration</h2>
            <p className="description-text">Please read before proceeding.</p>
          </div>

          <div className="overflow-y-auto flex-1 space-y-3 text-sm text-gray-600 leading-relaxed pr-1">
            <p>
              We at UP ACM understand the importance of data privacy and are
              committed to protecting the personal data of our community.
            </p>
            <p>
              The information collected through this form shall only be used for
              the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The official database of renewed members</li>
              <li>
                Use of the organization's official Google Drive and Calendar
              </li>
            </ul>
            <p>
              Appropriate measures shall be taken to ensure the safety of
              personal data stored in our databases, including secure storage,
              regular backups, and access controls to prevent unauthorized
              access.
            </p>
            <p>
              We ensure that personal data is not disclosed or shared with any
              third-party without consent or legal obligation.
            </p>
            <p>
              Individuals have the right to access, correct, and request
              deletion or restriction of their personal data. UP ACM recognizes
              these rights and will comply with valid requests.
            </p>
            <p className="font-medium text-gray-800">
              By answering this form, you give your consent to UP ACM to process
              your personal information.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-4 overflow-hidden">
            <label
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${consent ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
            >
              <input
                type="checkbox"
                checked={consent}
                onChange={() => setConsent(!consent)}
                className="mt-0.5 accent-blue-500"
              />
              <span className="text-sm text-gray-700">
                I give UP ACM my consent to process my personal information.
              </span>
            </label>

            <button
              disabled={!consent}
              onClick={() => setOpen(false)}
              className={consent ? "btn-primary" : "btn-primary-disabled"}
            >
              Proceed to registration
            </button>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      {formTemplate && (
        <FormContextProvider formTemplate={formTemplate?.template}>
          <div className="flex flex-col items-center w-screen h-screen">
            <Modal open={open} onClose={() => setOpen(false)}>
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-6">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-">
                    <div
                      className={`flex items-center gap-1.5 text-xs font-medium ${
                        i === index
                          ? "text-blue-600"
                          : i < index
                            ? "text-green-600"
                            : "text-gray-400"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          i === index
                            ? "bg-blue-600 text-white"
                            : i < index
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {step.label}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-8 h-px bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>

              {/* Step content */}
              <div className="flex-1 overflow-y-auto">
                {steps[index].content}
              </div>
            </Modal>

            <ProgressBar currentStep={page} />

            <form onSubmit={handleSignUp}>
              <Outlet
                context={{
                  email,
                  setEmail,
                  password,
                  setPassword,
                  page,
                  setPage,
                  setOpen,
                  open,
                  uploadFileData,
                  files,
                  setFiles,
                  handleSignUp,
                  formTemplate,
                  insertMemberData,
                  insertAnswersData,
                }}
              />
            </form>
          </div>
        </FormContextProvider>
      )}
    </>
  );
}

export default Signup;
