import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { supabase } from "../supabaseClient.jsx";

const DatabaseContext = createContext();

export const DatabaseContextProvider = ({ children }) => {
  const fetchFormTemplate = async () => {
    return await supabase.from("forms").select("*").eq("semester", "2526B");
  };

  const insertMemberData = async (user, form) => {
    const personal = form.personalInfo;
    const { data, error } = await supabase.from("members").insert({
      id: user.id, // MUST match auth.users.id

      first_name: personal.firstName,
      middle_name: personal.middleName,
      last_name: personal.lastName,
      suffix: personal.suffix,

      current_address: personal.currentAddress,
      birthday: null,
      gender: personal.gender,

      student_number: personal.studentNumber,
      college: personal.college,
      degree_program: personal.degreeProgram,
      year: personal.year,
      expected_grad_year: personal.expectedGradYear,
      highschool: personal.highschool,

      primary_email: personal.primaryEmail,
      up_email: personal.upEmail,
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

  const fetchMemberProfile = async () =>
    await supabase.from("members").select("*");

  const fetchMemberAnswers = async () =>
    await supabase.from("submissions").select("*");

  return (
    <DatabaseContext.Provider
      value={{
        fetchFormTemplate,
        insertMemberData,
        insertAnswersData,
        fetchMemberProfile,
        fetchMemberAnswers,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const UserDB = () => {
  return useContext(DatabaseContext);
};
