import { format } from "date-fns/fp";
import { useEffect, useState } from "react";

export default function ACMembership({ form }) {
  // useEffect((console.log(form)), [])

  let assessment = form?.assessment;
  let commitments = form?.commitments;

  console.log(form);

  return (
    <div className="form">
      <div>
        <div className="grid grid-cols-2">
          <div>
            <label htmlFor="">Committee</label>
            <p></p>
            <label htmlFor="">Status</label>
            <p></p>
            <label htmlFor="">Position</label>
            <p></p>
          </div>
          <div>
            <p>
              {commitments?.membership === "activeMember"
                ? "Active Member"
                : commitments?.membership === "inactiveMember"
                  ? "Inactive Member"
                  : "New Member"}
            </p>
            <p>{assessment?.committee?.lastSem}</p>
            <p>{assessment?.committee?.position}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
