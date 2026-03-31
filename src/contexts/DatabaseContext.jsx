import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { supabase } from "../supabaseClient.jsx";

const DatabaseContext = createContext();

export const DatabaseContextProvider = ({ children }) => {
  const fetchFormTemplate = async () => {
    const { data, error } = await supabase
      .from("forms")
      .select("*")
      .eq("semester", "2526B")
      .single();
    return { data, error };
  };

  const insertMemberData = async (user, form, authEmail) => {
    const personal = form.personalInfo;
    const { data, error } = await supabase.from("members").insert({
      id: user.id, // MUST match auth.users.id

      first_name: personal.firstName,
      middle_name: personal.middleName,
      last_name: personal.lastName,
      suffix: personal.suffix,

      current_address: personal.currentAddress,
      birthday: personal.birthday,
      gender: personal.gender,

      student_number: personal.studentNumber,
      college: personal.college,
      degree_program: personal.degreeProgram,
      year: personal.year,
      expected_grad_year: personal.expectedGradYear,
      highschool: personal.highschool,

      primary_email: personal.primaryEmail,
      up_email: personal.upEmail,
      auth_email: authEmail,
      phone: personal.phone,
      telephone: personal.telephone,
      emergency_name: personal.emergencyName,
      emergency_relation: personal.emergencyRelation,
      emergency_phone: personal.emergencyPhone,

      mbti: personal.mbti,
      discord: personal.discord,
      facebook: personal.facebook,
    });
    return { success: data, error };
  };

  const insertAnswersData = async (user, form, form_id) => {
    const { data, error } = await supabase.from("submissions").insert({
      user_id: user.id,
      form_id: form_id,
      answers: form,
    });
    return { success: data, error };
  };

  const updateAnswersData = async (uid, updated_path, new_val) => {
    console.log(uid, updated_path, new_val);
    let { data, error } = await supabase.rpc("update_answers", {
      new_val,
      uid,
      updated_path,
    });
    console.log(data);
    return { success: data, error };
  };

  const updateMembersData = async (uid, key, new_val) => {
    const { error } = await supabase
      .from("members")
      .update({ [key]: new_val })
      .eq("id", uid);
    return { error }
  };

  const fetchMemberProfile = async () =>
    await supabase.from("members").select("*");

  const fetchMemberAnswers = async () =>
    await supabase.from("submissions").select("*");

  const uploadFileData = async (user, type, file) => {
    const { data, error } = await supabase.storage
      .from("acm-files")
      .upload(`members/member-${user.id}/${type}/${file.name}`, file);
    return { success: data, error };
  };

  const fetchMemberEmail = async (studentNum) => {
    const { data, error } = await supabase
      .from("members")
      .select("auth_email")
      .eq("student_number", studentNum)
      .single();

    if (error) return { data: null, error };
    return { data: data.auth_email, error: null };
  };

  return (
    <DatabaseContext.Provider
      value={{
        fetchFormTemplate,
        insertMemberData,
        insertAnswersData,
        updateAnswersData,
        updateMembersData,
        fetchMemberProfile,
        fetchMemberAnswers,
        fetchMemberEmail,
        uploadFileData,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const UserDB = () => {
  return useContext(DatabaseContext);
};
