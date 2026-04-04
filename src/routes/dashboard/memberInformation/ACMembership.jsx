import { format } from "date-fns/fp";
import { useEffect, useState } from "react";

export default function ACMembership({ form }) {

  let assessment = form?.assessment;
  let commitments = form?.commitments;


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
              {commitments?.membership?.value === "activeMember"
                ? "Active Member"
                : commitments?.membership?.value === "inactiveMember"
                  ? "Inactive Member"
                  : "New Member"}
            </p>
            <p>{assessment?.committee?.lastSem?.value}</p>
            <p>{assessment?.committee?.position?.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
