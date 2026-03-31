import { useState, useEffect } from "react";
import { UserDB } from "../contexts/DatabaseContext.jsx";

export default function useMemberForm(form, user) {
  const { updateMembersData } = UserDB();
  const [memberForm, newMemberForm] = useState(form);

  useEffect(() => {
    newMemberForm(form);
  }, [form]);

  const handleChange = (e) => {
    const { value, id } = e.target;
    newMemberForm((prev) => ({
      ...prev,
      [id]: value,
    }));
    handleUpdate(value, id);
  };

  const handleUpdate = async (value, id) => {
    const dawdw = await updateMembersData(user, id, value);
    console.log(dawdw);
  };

  return [memberForm, handleChange]
}
