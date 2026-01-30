import { useOutletContext, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import "../../styles/components.css";
import Add from "../../components/Add.jsx";

export default function Commitments() {
  const { formData, setFormData, localStorage, setLocalStorage } =
    useOutletContext();
  const [complete, setComplete] = useState(false);
  const upRef = useRef(null);
  const nonUpRef = useRef(null);
  const Navigate = useNavigate();

  const updateOrgs = (prev = formData, org, ref) => {
    const commitments = prev?.commitments[org] ?? "";
    return {
      ...prev,
      commitments: {
        ...(prev?.commitments ?? formData?.commitments),
        [org]: [...commitments, ref.current.value],
      },
    };
  };

  const updateMembership = (prev, value, id) => {
    return {
      ...prev,
      commitments: {
        ...prev?.commitments,
        membership: id
      }
    }
  }

  const updatePriorities = (prev = formData, value) => {
    return {
      ...prev,
      commitments: {
        ...(prev?.commitments ?? formData?.commitments),
        priorities: value,
      },
    };
  };

  const updateConcerns = (prev = formData, name, value) => {
    return {
      ...prev,
      commitments: {
        ...(prev?.commitments ?? formData?.commitments),
        concerns: {
          ...(prev?.commitments?.concerns ?? formData?.concerns),
          [name]: value,
        },
      },
    };
  };

  const handleAddOrg = (e, org, ref) => {
    e.preventDefault();
    setFormData((prev) => updateOrgs(prev, org, ref));
    setLocalStorage((prev) => updateOrgs(prev, org, ref));
    upRef.current.value = "";
    nonUpRef.current.value = "";
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    if (name === "priorities") {
      setFormData((prev) => updatePriorities(prev, value));
      setLocalStorage((prev) => updatePriorities(prev, value));
    } else if (name === "member") {
      setFormData((prev) => updateMembership(prev, value, id));
      setLocalStorage((prev) => updateMembership(prev, value, id));
    } else {
      setFormData((prev) => updateConcerns(prev, name, value));
      setLocalStorage((prev) => updateConcerns(prev, name, value));
    }
  };

  useEffect(() => {
    if (
      Object.values(formData?.commitments).every((v) => v != "") &&
      localStorage?.up?.length > 0 &&
      localStorage?.nonup?.length > 0 &&
      Object.values(formData?.commitments?.concerns).every((v) => v != "")
    ) {
      setComplete(() => true);
    } else {
      setComplete(() => false);
    }
  }, [formData.commitments]);

  return (
    <div className="form-frame">
      <div className="form">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">ACM Member Affiliation Form</h1>
          <p className="text-sm text-gray-600">
            Step 2 of 5 · Commitments
          </p>
        </div>
        {/* Membership type */}
        <div>
          <h2>Type of membership</h2>
          <input
            name="member"
            id="newMember"
            type="radio"
            checked={localStorage?.commitments?.membership === "newMember"}
            onChange={handleChange}
          />
          <label htmlFor="newMember"> New Member</label>
          <input
            name="member"
            id="activeMember"
            type="radio"
            checked={localStorage?.commitments?.membership === "activeMember"}
            onChange={handleChange}
          />
          <label htmlFor="activeMember"> Active Member</label>
          <input
            name="member"
            id="returningMember"
            type="radio"
            checked={localStorage?.commitments?.membership === "returningMember"}
            onChange={handleChange}
          />
          <label htmlFor="returningMember"> Returning Member</label>
        </div>
        {/* UP organizations */}
        <div>
          <h2>Other Organization within UP</h2>
          {localStorage?.commitments?.up?.map((org, index) => (
            <div key={index}>{org}</div>
          ))}
          <Add handler={handleAddOrg} ref={upRef} list="up" />
        </div>
        {/* Non-UP organizations */}
        <div>
          <h2>Other Organization beyond UP</h2>
          {localStorage?.commitments?.nonup?.map((org, index) => (
            <div key={index}>{org}</div>
          ))}
          <Add handler={handleAddOrg} ref={nonUpRef} list="nonup" />
        </div>
        {/* Other priorities */}
        <div>
          <h2>Other significant priorities</h2>
          <input
            type="text"
            name="priorities"
            value={localStorage?.commitments?.priorities || ""}
            onChange={handleChange}
            className="text-field"
          />
        </div>
        {/* Special concerns */}
        <div>
          <h2>Special Concerns</h2>
          <p>
            Feel free to share any concerns you would like us to take note :)
            Anything from academic concerns (eg. naghahabol ng grad, under
            contract, maintaining scholarship, heavy subjects), to health
            concerns (dietary restrictions, chronic ailments, disabilities,
            mental or psychological health concerns, etc.), or any other
            personal or interpersonal concern you would like us to know and
            consider so we could try to figure out together how we could support
            each other. :) Please be assured that this information will be
            secured in confidence within the Executive Council of the
            localStorage, and will never be used against you. Our objective is
            solely to figure out how we may support and protect our members,
            given their individual needs.
          </p>
          <div>
            <h3>Academic Concerns</h3>
            <textarea
              name="acad"
              value={localStorage?.commitments?.concerns?.acad || ""}
              onChange={handleChange}
              className="text-field"
            />
          </div>
          <div>
            <h3>Health Concerns</h3>
            <textarea
              name="health"
              value={localStorage?.commitments?.concerns?.health || ""}
              onChange={handleChange}
              className="text-field"
            />
          </div>
          <div>
            <h3>Personal / Interpersonal Concerns</h3>
            <textarea
              name="personal"
              value={localStorage?.commitments?.concerns?.personal || ""}
              onChange={handleChange}
              className="text-field"
            />
          </div>
          <div>
            <h3>Other Concerns</h3>
            <textarea
              name="other"
              value={localStorage?.commitments?.concerns?.other || ""}
              onChange={handleChange}
              className="text-field"
            />
          </div>
        </div>
        {/* Next button */}
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={(e) => {
            e.preventDefault();
            !complete && Navigate("/signup/organization-related");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
