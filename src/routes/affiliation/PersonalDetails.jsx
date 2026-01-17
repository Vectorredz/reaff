import "../../styles/components.css";
import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import Field from "../../components/Field.jsx";

export default function PersonalDetails() {
  const { formData, setFormData } = useOutletContext();
  const [complete, setComplete] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  useEffect(() => {
    console.log(formData.personalInfo);
    if (Object.values(formData.personalInfo).every((value) => value !== "")) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [formData.personalInfo]);

  return (
    <div className="form-frame">  
      <div className="form-card">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">ACM Member Affiliation Form</h1>
          <p className="text-sm text-gray-600">
            Step 1 of 4 · Personal Information
          </p>
        </div>

        {/* PERSONAL INFO */}
        <section className="form-section">
          <h2 className="section-title">Personal Information</h2>

          <div className="grid grid-cols-4 gap-4">
            <Field label="First Name">
              <input
                name="firstName"
                placeholder="Jammond"
                className="text-field"
                value={formData.personalInfo?.firstName || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="Middle Name">
              <input
                name="middleName"
                placeholder="Diamondback"
                className="text-field"
                value={formData.personalInfo?.middleName || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="Last Name">
              <input
                name="lastName"
                placeholder="Terrapin"
                className="text-field"
                value={formData.personalInfo?.lastName || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="Suffix">
              <input
                name="suffix"
                placeholder="Jr."
                className="suffix-field"
                value={formData.personalInfo?.suffix || ""}
                onChange={handleChange}
              />
            </Field>
          </div>

          <Field label="Current Address" className="mt-4">
            <input
              name="currentAddress"
              placeholder="Street Address, Barangay, City, Province"
              className="text-field"
              value={formData.personalInfo?.currentAddress || ""}
              onChange={handleChange}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Gender">
              <input
                name="gender"
                className="text-field"
                value={formData.personalInfo?.gender || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="Birthday">
              <input
                type="date"
                name="birthday"
                className="text-field"
                value={formData.personalInfo?.birthday || ""}
                onChange={handleChange}
              />
            </Field>
          </div>
        </section>

        {/* STUDENT INFO */}
        <section className="form-section">
          <h2 className="section-title">Student Information</h2>

          <Field label="Student Number">
            <input
              name="studentNumber"
              className="text-field"
              placeholder="20XX-XXXXX"
              value={formData.personalInfo?.studentNumber || ""}
              onChange={handleChange}
            />
          </Field>

          <div className="grid grid-cols-4 gap-4 mt-4">
            <Field label="Current Year">
              <input
                name="year"
                placeholder="Freshman"
                className="text-field"
                value={formData.personalInfo?.year || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="Expected Grad Year">
              <input
                name="expectedGradYear"
                placeholder="20XX"
                className="text-field"
                value={formData.personalInfo?.expectedGradYear || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="College">
              <input
                name="college"
                placeholder="Engineering"
                className="text-field"
                value={formData.personalInfo?.college || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="Degree Program">
              <input
                name="degreeProgram"
                placeholder="Computer Science"
                className="text-field"
                value={formData.personalInfo?.degreeProgram || ""}
                onChange={handleChange}
              />
            </Field>
          </div>

          <Field label="High School Attended" className="mt-4">
            <input
              name="highschool"
              placeholder="University of Santo Tomas Highschool"
              className="text-field"
              value={formData.personalInfo?.highschool || ""}
              onChange={handleChange}
            />
          </Field>
        </section>

        {/* CONTACT INFO */}
        <section className="form-section">
          <h2 className="section-title">Contact Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary Email">
              <input
                name="primaryEmail"
                placeholder="jammond@gmail.com"
                className="text-field"
                value={formData.personalInfo?.primaryEmail || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="UP Email">
              <input
                name="upEmail"
                placeholder="jammond@up.edu.ph"
                className="text-field"
                value={formData.personalInfo?.upEmail || ""}
                onChange={handleChange}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field label="Mobile Number">
              <input
                name="phone"
                placeholder="09XX XXX XXXX"
                className="text-field"
                value={formData.personalInfo?.phone || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="Telephone">
              <input
                name="telephone"
                placeholder="09XX XXX XXXX"
                className="text-field"
                value={formData.personalInfo?.telephone || ""}
                onChange={handleChange}
              />
            </Field>
          </div>
        </section>

        {/* EMERGENCY CONTACT */}
        <section className="form-section">
          <h2 className="section-title">Emergency Contact</h2>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Contact Person">
              <input
                name="emergencyName"
                className="text-field"
                value={formData.personalInfo?.emergencyName || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="Relationship">
              <input
                name="emergencyRelation"
                className="text-field"
                value={formData.personalInfo?.emergencyRelation || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="Contact Number">
              <input
                name="emergencyPhone"
                className="text-field"
                value={formData.personalInfo?.emergencyPhone || ""}
                onChange={handleChange}
              />
            </Field>
          </div>
        </section>

        {/* OTHERS */}
        <section className="form-section">
          <h2 className="section-title">Other Information</h2>

          <div className="grid grid-cols-3 gap-4">
            <Field label="MBTI">
              <input
                name="mbti"
                className="text-field"
                value={formData.personalInfo?.mbti || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="Discord Tag">
              <input
                name="discord"
                className="text-field"
                value={formData.personalInfo?.discord || ""}
                onChange={handleChange}
              />
            </Field>

            <Field label="Facebook Profile">
              <input
                name="facebook"
                className="text-field"
                value={formData.personalInfo?.facebook || ""}
                onChange={handleChange}
              />
            </Field>
          </div>
        </section>

        {/* FOOTER */}
        <div className="flex justify-between items-center pt-6 border-t">
          <span className="text-sm text-gray-500">
            Please review before proceeding
          </span>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={(e) => {
              e.preventDefault();
              console.log(complete, formData);
              !complete && Navigate("/signup/commitments");
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
