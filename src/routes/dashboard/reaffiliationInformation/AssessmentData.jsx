import Field from "../../../components/Field.jsx";

export default function AssessmentData({ form }) {
  let assessment = form?.assessment;

  const assessmentData = {
    best: "Best Experience",
    vision: "Vision",
    improve: "Areas for Improvement",
    projects: "Projects",

    committee: {
      lastSem: "Last Semester Committee",
      feedback: "Feedback",
      position: "Position",
      improvement: "Improvement",
    },

    elaboration: "Elaboration",

    activePerformance: {
      task: "Task Performance",
      events: "Event Participation",
      assembly: "Assembly Attendance",
      meetings: "Meeting Attendance",
    },

    projectPerformance: {
      task: "Task Performance",
      time: "Time Commitment",
      meetings: "Meeting Attendance",
      communication: "Communication",
    },
  };

  return (
    <div className="form">
      <div>
        <h1 className="font-semibold">Assessment</h1>
      </div>

      <section className="form-section">
        {Object.keys(assessmentData)?.map((item, idx) =>
          item === "projects" ? (
            <Field keys={idx} flex="row" label={assessmentData[item]}>
              {assessment?.[item]?.value?.map((proj, projIdx) => (
                <p key={projIdx}>{proj}</p>
              ))}
            </Field>
          ) : item === "committee" ? (
            Object.keys(assessmentData.committee).map((sub, subIdx) => (
              <Field
                keys={subIdx}
                flex="row"
                label={assessmentData.committee[sub]}
              >
                <p>{assessment?.committee?.[sub]?.value}</p>
              </Field>
            ))
          ) : item === "activePerformance" ? (
            Object.keys(assessmentData.activePerformance).map(
              (sub, subIdx) => (
                <Field
                  keys={subIdx}
                  flex="row"
                  label={assessmentData.activePerformance[sub]}
                >
                  <p>{assessment?.activePerformance?.[sub]?.value}</p>
                </Field>
              ),
            )
          ) : item === "projectPerformance" ? (
            Object.keys(assessmentData.projectPerformance).map(
              (sub, subIdx) => (
                <Field
                  keys={subIdx}
                  flex="row"
                  label={assessmentData.projectPerformance[sub]}
                >
                  <p>{assessment?.projectPerformance?.[sub]?.value}</p>
                </Field>
              ),
            )
          ) : (
            <Field keys={idx} flex="row" label={assessmentData[item]}>
              <p>{assessment?.[item]?.value}</p>
            </Field>
          ),
        )}
      </section>
    </div>
  );
}