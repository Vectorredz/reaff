import "../styles/index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserAuth } from "../contexts/AuthContext.jsx";
import { UserDB } from "../contexts/DatabaseContext.jsx";
import { toast } from "react-toastify";
import { Outlet } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Modal from "../components/Modal.jsx";
// mock single page for the register form

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { signUpNewUser } = UserAuth();
  const {
    fetchFormTemplate,
    insertMemberData,
    insertAnswersData,
  } = UserDB();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [formTemplate, setFormTemplate] = useState(null);
  const [formData, setFormData] = useState(formTemplate);
  const [ localStorage, setLocalStorage ] = useLocalStorage('form', formData)
  const Navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setOpen(true);
  //   }, 900);
  // }, []);

  // 2. wait the value returned from promise and put it in setFormTempalte
  async function handleFetchForm() {
    setFormTemplate(await fetchFormTemplate());
  }

  // 1. first mount; fetch the form template from the database
  useEffect(() => {
    handleFetchForm();
  }, []);

  // useEffect(() => {
  //   console.log(formData)
  // }, [formData])

  useEffect(() => {
    if (formTemplate != null) {
      setFormData(formTemplate.data[0].template);
      setLoading(false);
    }
  }, [formTemplate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userResult = await signUpNewUser(email, password);
      if (userResult.error) {
        throw userResult.error
      }
      else if (!userResult.error && (userResult.data && userResult.success)) {
        const user = userResult.data.user;
        const member = await insertMemberData(user, formData)
        const answers = await insertAnswersData(user, formData, formTemplate.data[0]?.id)
        if (member.error || answers.error) {
          throw member.error ?? answers.error
        } 
        else if (!member.error & !answers.error) {
          toast.success('Created account successfully');
          setTimeout(() => {
            Navigate('/')
          }, 1000)
        }
      }

    } catch (error) {
        toast.error(error.message)
        console.error(error.message)
      // remove the account 
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <>
      {!loading && (
        <div className="flex flex-col items-center w-screen h-screen">
          <p>{open ? "You are logged in" : "Please sign up to continue"}</p>
          <Modal open={open} onClose={() => setOpen(false)}>
            {index === 0 && (
              <div className="flex flex-col gap-2">
                <h1>UP ACM Affiliation Form</h1>
                <p>
                  Thank you for your interest in renewing your membership for UP
                  ACM this year. We're excited to have a fruitful semester with
                  you as we gradually move our activities F2F. Let's continue to
                  build communities together!
                </p>
                <p>
                  As stated in our Constitution Article III Section C, an active
                  member must do the following:
                </p>
                <ol>
                  <li>
                    (1) do the committee tasks assigned by the committee head
                  </li>
                  <li>
                    (2) participate in any or all internal and external events
                  </li>
                  <li>(3) pay membership fee</li>
                  <li>
                    (4) attend in all committee meetings called by the committee
                    head
                  </li>
                  <li>
                    (5) attend in all GA, and lastly understand and abide the
                    constitution
                  </li>
                </ol>
                <p>
                  Committing reaffirmation means agreeing with all of the above
                  responsibilities of an active member. This form is to be done
                  ONCE only and will take 15-20 minutes to accomplish. Thank
                  you!
                </p>
                <button
                  className="btn-primary"
                  onClick={() => setIndex(index + 1)}
                >
                  Read the preamble
                </button>
              </div>
            )}
            {index === 1 && (
              <div>
                <h2 className="text-lg font-semibold">
                  Data Privacy Declaration
                </h2>
                <img src="preamble.jpg"></img>
                <button
                  className="btn-primary"
                  onClick={() => setIndex(index + 1)}
                >
                  Proceed to data privacy declaration
                </button>
              </div>
            )}
            {index === 2 && (
              <div className="flex flex-col gap-4 overflow-y-scroll h-full">
                <h2 className="text-lg font-semibold">
                  Data Privacy Declaration
                </h2>

                <section className="space-y-2 text-sm leading-relaxed">
                  <p>
                    We at UP ACM understand the importance of data privacy and
                    are committed to protecting the personal data of our
                    community.
                  </p>

                  <p>
                    The information collected through this form shall only be
                    used for the following purposes:
                  </p>

                  <ul className="list-disc pl-5">
                    <li>The official database of renewed members</li>
                    <li>
                      Use of the organization’s official Google Drive and
                      Calendar
                    </li>
                  </ul>

                  <p>
                    Appropriate measures shall be taken to ensure the safety of
                    personal data stored in our databases, including secure
                    storage, regular backups, and access controls to prevent
                    unauthorized access.
                  </p>

                  <p>
                    We ensure that personal data is not disclosed or shared with
                    any third-party without consent or legal obligation.
                  </p>

                  <p>
                    Individuals have the right to access, correct, and request
                    deletion or restriction of their personal data. UP ACM
                    recognizes these rights and will comply with valid requests.
                  </p>

                  <p className="font-medium">
                    By answering this form, you give your consent to UP ACM to
                    process your personal information.
                  </p>
                </section>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={() => setConsent(!consent)}
                    required
                  />
                  <span>
                    I give UP ACM my consent to process my personal information.
                  </span>
                </label>

                <button
                  disabled={!consent}
                  onClick={() => setOpen(false)}
                  className="self-start btn-primary"
                >
                  Proceed to registration
                </button>
              </div>
            )}
          </Modal>
          <ProgressBar currentStep={1} />
          <form onSubmit={handleSignUp}>
            <Outlet
              context={{
                formData,
                setFormData,
                localStorage,
                setLocalStorage,
                email,
                setEmail,
                password,
                setPassword,
                
              }}
            />
          </form>
        </div>
      )}
      {loading}
    </>
  );
}

export default Signup;
