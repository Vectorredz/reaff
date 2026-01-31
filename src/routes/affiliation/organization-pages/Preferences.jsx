import { useNavigate, useOutletContext } from "react-router";
import { useEffect } from "react";
import Header from "../../../components/Header";
export default function Preferences() {
  const Navigate = useNavigate();
  const { formData, setFormData, localStorage, setLocalStorage, page } =
    useOutletContext();
  const tops = [1, 2, 3];

  const updateReasons = (prev = formData, value, id, name) => {
    return {
      ...prev,
      organization: {
        ...prev?.organization,
        preferences: {
          ...prev?.organization?.preferences,
          [id]: {
            ...prev?.organization?.preferences[id],
            [name]: value,
          },
        },
      },
    };
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    setFormData((prev) => updateReasons(prev, value, id, name));
    setLocalStorage((prev) => updateReasons(prev, value, id, name));
  };

  useEffect(() => {
    console.log(formData.organization.preferences);
  }, [formData]);

  return (
    <div className="form">
      {/* Page Title */}
      <Header page={page} title={"Organization-related | Preferences"}></Header>

      {/* Primer Section */}
      <div className="space-y-2 rounded-lg border border-gray-300 p-5">
        <h3 className="text-lg font-medium">2526 UP ACM Committee Primer</h3>
        <p className="text-sm text-gray-600">
          Check out the Committee Primer to learn more about each committee.
          <a href="/" className="ml-1 text-blue-600 hover:underline">
            See primer here
          </a>
        </p>
      </div>

      {/* Preferences Section */}
      <div className="space-y-8">
        <h3 className="text-xl font-semibold">Committee Preference</h3>

        {/* Drag and Drop Placeholder */}
        <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-gray-400">
          Insert Drag and Drop here
        </div>

        {/* Preference Evaluation */}
        <p className="text-sm text-gray-500">Preference Evaluation</p>

        {/* Top Preferences */}
        {tops.map((top) => (
          <div
            key={top}
            className="space-y-4 rounded-lg border border-gray-300 p-5"
          >
            <h4 className="text-base font-medium">
              Top {top} Preferred Committee
            </h4>

            {/* Reason */}
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Reason for preference *
              </label>
              <textarea
                className="text-field min-h-[100px]"
                name="reason"
                id={`top${top}`}
                placeholder="Experience, skills, motivation, or what you can contribute"
                value={localStorage?.organization?.preferences[`top${top}`]?.reason}
                onChange={handleChange}
                required
              />
            </div>

            {/* Expectation */}
            <div className="space-y-1">
              <label className="text-sm font-medium">
                What you expect from this committee
              </label>
              <textarea
                name="expectation"
                className="text-field min-h-[100px]"
                id={`top${top}`}
                placeholder="Experience, skills, motivation, or what you can contribute"
                value={
                  localStorage?.organization?.preferences[`top${top}`]?.expectation
                }
                onChange={handleChange}
                required
              />
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn-primary"
        onClick={(e) => {
          e.preventDefault();
          Navigate("/signup/organization-related/events");
        }}
      >
        Next
      </button>
    </div>
  );
}
