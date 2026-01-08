import "../styles/index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserAuth } from "./context/AuthContext.jsx";
import { toast } from "react-toastify";
import Modal from "../components/Modal.jsx";
import { Outlet } from 'react-router'
// mock single page for the register form

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { session, signUpNewUser, signInUser, signOutUser } = UserAuth();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({
        personalInfo: {
          firstName: '',
          lastName: '',
          middleName: '',
          suffix: '',
          nickname: '',
          preferredName: false,
          birthday: '',
          gender: '',
          year: '',
          degreeProgram: '',
          college: '',
          expectedGradYear: '',
          primaryEmail: '',
          upEmail: '',
          phone: '',
          telephone: '',
          emergencyName: '',
          emergencyRelation: '',
          emergencyPhone: '',
          mbti: '',
          discord: '',
          facebook: ''
        }
    })
  const Navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setOpen(true);
  //   }, 900);
  // }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpNewUser(email, password);
      if (result.success) Navigate("/dashboard/home");
    } catch (error) {
      setError("an error occured");
      toast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-screen h-screen">
        <div>
          <h1>ACM Affiliation Form</h1>
        </div>
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
                ONCE only and will take 15-20 minutes to accomplish. Thank you!
              </p>
              <button onClick={() => setIndex(index + 1)}>
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
              <button onClick={() => setIndex(index + 1)}>
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
                  We at UP ACM understand the importance of data privacy and are
                  committed to protecting the personal data of our community.
                </p>

                <p>
                  The information collected through this form shall only be used
                  for the following purposes:
                </p>

                <ul className="list-disc pl-5">
                  <li>The official database of renewed members</li>
                  <li>
                    Use of the organization’s official Google Drive and Calendar
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
                className="self-start"
              >
                Proceed to registration
              </button>
            </div>
          )}
        </Modal>
        <div>
          <ul className="flex gap-5">
            <li>Personal details</li>
            <li>Commitments</li>
            <li>Committee Concerns</li>
            <li>Payment</li>
          </ul>
        </div>
        <form onSubmit={handleSignUp}>
          <Outlet context={{formData, setFormData}}/>
          <button disabled={loading} type="submit">
            Signup
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
