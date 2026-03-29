import Field from "../../../components/Field.jsx";
import { useState } from "react";
import { useEffect } from "react";
export default function ContactInfo({ form, user, updateAnswersData}) {
  const handleChange = (e) => {
    const { value } = e.target
    updateContactForm(value)
  }

  // useEffect(() => {console.log(user, updateAnswersData)}, [user, updateAnswersData])

  const [contactForm, updateContactForm] = useState(form?.phone)

  const handleUpdate = async () => {
    const result  = await updateAnswersData(user, contactForm)
    console.log(result)
  }

  useEffect(() => {
   handleUpdate()
  }, [contactForm])

  return (
    <div className="form">
      <div>
        <h1 className="font-semibold">Contact Info</h1>
      </div>
      <section className="form-section ">
        <Field flex="row" label="Mobile Phone:">
          <input 
            value={contactForm ?? form?.phone} 
            onChange={(e) => handleChange(e)}>
          </input>
        </Field>
        <Field flex="row" label="Telephone:">
          <input value={`${form?.telephone}`}></input>
        </Field>
        <Field flex="row" label="Primary Email Address:">
          <p>{`${form?.primary_email}`}</p>
        </Field>
        <Field flex="row" label="UP Email Address:">
          <p>{`${form?.up_email}`}</p>
        </Field>
      </section>
    </div>
  );
}
