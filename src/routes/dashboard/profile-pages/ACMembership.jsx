import { useEffect } from "react"

export default function ACMembership({memberData}) {
    // useEffect((console.log(form)), [])
    const assessment = memberData?.assessment
    const commitments = memberData?.commitments
    // useEffect(() => {console.log(member)}, [member])
    return (
        <div className='form'>
            <h2 className='font-semibold'>ACMembership Info</h2>
            <div>
              <div className='grid grid-cols-2'>
                  <div>
                      <label htmlFor="">Position</label>
                      <p></p>
                      <label htmlFor="">Committee</label>
                      <p></p>
                      <label htmlFor="">Status</label>
                      <p></p>
                  </div>
                  <div>
                    <p>{commitments?.membership === "activeMember" ? "Active Member" : commitments?.membership === "inactiveMember" ? "Inactive Member" : "New Member" }</p>
                    <p>{assessment?.committee?.lastSem}</p>
                    <p>{assessment?.committee?.position}</p>
                  </div>
              </div>
            </div>
        </div>
    )
}