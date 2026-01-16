import { useOutletContext, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import "../../styles/components.css";
import Add from "../../components/Add.jsx";

export default function Commitments() {
  const { formData, setFormData } = useOutletContext();
  const [complete, setComplete] = useState(false);
  const [organization, setOrganization] = useState({
    up: [],
    nonup: [],
  });
  const upRef = useRef(null);
  const nonUpRef = useRef(null);
  const Navigate = useNavigate();

  const handleAddOrg = (e, org, ref) => {
    e.preventDefault()
    setOrganization((prev) => ({
      ...prev,
      [org]: [...prev[org], ref.current.value]
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "priorities") {
      setFormData((prev) => ({
        ...prev,
        commitments: {
          ...prev.commitments,
          priorities: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      commitments: {
        ...prev.commitments,
        concerns: {
          ...prev.commitments.concerns,
          [name]: value,
        },
      },
    }));
  };

  useEffect(() => {
    upRef.current.value = '';
    nonUpRef.current.value = '';
    setFormData((prev) => ({
      ...prev, 
      commitments: {
        ...prev.commitments,
        ...organization
      }
    }))
    console.log(formData.commitments)
  }, [organization]) 

  useEffect(() => {
    if (Object.values(formData?.commitments).every((v) => v != "") && (organization.up.length > 0 && organization.nonup.length > 0) &&
    Object.values(formData?.commitments?.concerns).every((v) => v != "")) {
      setComplete(() => true);
    } else {
      setComplete(() => false);
    }
  }, [formData.commitments]);

  return (
    <div className="form">
      {/* Membership type */}
      <div>
        <h2>Type of membership</h2>

        <input name="member" id="newMember" type="radio" />
        <label htmlFor="newMember"> New Member</label>

        <input name="member" id="activeMember" type="radio" />
        <label htmlFor="activeMember"> Active Member</label>

        <input name="member" id="returningMember" type="radio" />
        <label htmlFor="returningMember"> Returning Member</label>
      </div>

      {/* UP organizations */}
      <div>
        <h2>Other Organization within UP</h2>

        {organization.up.map((org, index) => (
          <div key={index}>{org}</div>
        ))}
        <Add handler={handleAddOrg} ref={upRef} list='up' />
      </div>

      {/* Non-UP organizations */}
      <div>
        <h2>Other Organization beyond UP</h2>

        {organization.nonup.map((org, index) => (
          <div key={index}>{org}</div>
        ))}

        <Add handler={handleAddOrg} ref={nonUpRef} list='nonup' />
      </div>

      {/* Other priorities */}
      <div>
        <h2>Other significant priorities</h2>
        <input
          type="text"
          name="priorities"
          value={formData?.commitments?.priorities || ""}
          onChange={handleChange}
          className="text-field"
        />
      </div>

      {/* Special concerns */}
      <div>
        <h2>Special Concerns</h2>

        <div>
          <h3>Academic Concerns</h3>
          <textarea
            name="acad"
            value={formData?.commitments?.concerns?.acad || ""}
            onChange={handleChange}
            className="text-field"
          />
        </div>

        <div>
          <h3>Health Concerns</h3>
          <textarea
            name="health"
            value={formData?.commitments?.concerns?.health || ""}
            onChange={handleChange}
            className="text-field"
          />
        </div>

        <div>
          <h3>Personal / Interpersonal Concerns</h3>
          <textarea
            name="personal"
            value={formData?.commitments?.concerns?.personal || ""}
            onChange={handleChange}
            className="text-field"
          />
        </div>

        <div>
          <h3>Other Concerns</h3>
          <textarea
            name="other"
            value={formData?.commitments?.concerns?.other || ""}
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
          console.log(complete, formData);
          !complete && Navigate("/signup/organization-related");
        }}
      >
        Next
      </button>
    </div>
  );
}
