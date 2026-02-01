import "../styles/index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserAuth } from "../contexts/AuthContext.jsx";
import { UserDB } from "../contexts/DatabaseContext.jsx";
import { toast } from "react-toastify";
import { Outlet } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import useForm from "../hooks/useForm.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Modal from "../components/Modal.jsx";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUpNewUser } = UserAuth();
  const {
    fetchFormTemplate,
    insertMemberData,
    insertAnswersData,
    uploadFileData,
  } = UserDB();

  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [formTemplate, setFormTemplate] = useState(null);
  const [page, setPage] = useState(1);
  const [localStorage, setLocalStorage, clearLocalStorage] = useLocalStorage(
    "form",
    formTemplate,
  );
  const form = useForm(formTemplate, { setLocalStorage });
  const [files, setFiles] = useState({
    form5: { file: null, id: null },
    upid: { file: null, id: null },
    picture: { file: null, id: null },
    resume: { file: null, id: null },
  });
  const Navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => setOpen(true), 900);
  // }, []);

<<<<<<< HEAD
=======
  // 2. wait the value returned from promise and put it in setFormTempalte
>>>>>>> 65dd3a9 (feat: initial form validation)
  async function handleFetchForm() {
    setLoading(true);
    setFormTemplate(await fetchFormTemplate());
  }

  useEffect(() => {
    handleFetchForm();
  }, []);

  useEffect(() => {
    if (loading) toast.loading("fetching form...", { toastId: "form" });
    else toast.dismiss("form");
  }, [loading]);

  useEffect(() => {
<<<<<<< HEAD
    function recurseFileTree(data, node, state) {
      if (typeof data[node] !== "object") return { status: "", error: "" };
      if (data[node].length === 0) return { status: "", error: "" };
      for (const child of Object.keys(data[node])) {
        state[child] = recurseFileTree(data[node], child, (state[child] = {}));
      }
      return state;
    }

    if (formTemplate) {
      const data = localStorage ?? formTemplate?.data[0]?.template;
      let state = {};
      for (const node of Object.keys(data)) {
        if (node != "meta") recurseFileTree(data, node, (state[node] = {}));
      }
      form.setValues(data);
=======
    if (formTemplate != null) {
      setFormData(localStorage ?? formTemplate?.data[0]?.template);
>>>>>>> 65dd3a9 (feat: initial form validation)
    }
  }, [formTemplate]);

  useEffect(() => {
<<<<<<< HEAD
    if (form?.values != null) setLoading(false);
  }, [form?.values]);
=======
    if (formData != null) {
      setLoading(false)
    }      
  }, [formData]);
>>>>>>> 65dd3a9 (feat: initial form validation)

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userResult = await signUpNewUser(email, password);
      if (userResult.error) throw userResult.error;
      if (!userResult.error && userResult.data && userResult.success) {
        const user = userResult.data.user;
        for (const key in files) {
          const fileObj = files[key];
          if (fileObj?.file) await uploadFileData(user, key, fileObj.file);
        }
        const member = await insertMemberData(user, form.values, email);
        const answers = await insertAnswersData(
          user,
          form.values,
          formTemplate?.data[0]?.id,
        );
        if (member.error || answers.error) throw member.error ?? answers.error;
        toast.success("Created account successfully");
        setTimeout(() => Navigate("/"), 1000);
      }
    } catch (error) {
      toast.error(error.message);
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
      {form?.values && (
        <div className="flex flex-col items-center w-screen h-screen">
          <Modal open={open} onClose={() => setOpen(false)}>
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-">
                  <div
                    className={`flex items-center gap-1.5 text-xs font-medium ${i === index ? "text-blue-600" : i < index ? "text-green-600" : "text-gray-400"}`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${i === index ? "bg-blue-600 text-white" : i < index ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      {i < index ? i + 1 : i + 1}
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
            <div className="flex-1 overflow-y-auto">{steps[index].content}</div>
          </Modal>

          <ProgressBar currentStep={1} />

          <form onSubmit={handleSignUp}>
            <Outlet
              context={{
                form,
                localStorage,
                setLocalStorage,
                clearLocalStorage,
                email,
                setEmail,
                password,
                setPassword,
                page,
                setPage,
<<<<<<< HEAD
                uploadFileData,
                files,
                setFiles,
=======

>>>>>>> 65dd3a9 (feat: initial form validation)
              }}
            />
          </form>
        </div>
      )}
    </>
  );
}

export default Signup;
