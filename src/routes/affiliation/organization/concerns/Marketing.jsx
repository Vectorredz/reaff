export default function Marketing() {
  return (
    <div>
      <h2>Marketing Committee Concerns</h2>
      <div>
        <h3>
          Are you willing to disclose your personal information (name, year
          level, course, email address) to UP ACM's company sponsors/partners?
        </h3>
        <p>
          It is the initiative of the Marketing Committee to connect the UP
          ACM's members to its company sponsors/partners to open up internship
          or job opportunities.
        </p>
        <div>
          <input type="radio" name="disclose" id="yes" />
          <label htmlFor="yes">Yes</label>
          <input type="radio" name="disclose" id="no" />
          <label htmlFor="no">No</label>
        </div>
      </div>
      <div>
        <h3>Attach your RESUME / CV below</h3>
        <p>
          {" "}
          Alternatively, you may submit your RESUME/CV by emailing it to
          marketing@upacm.net with the SUBJECT: LASTNAME RESUME/CV.{" "}
        </p>
        <span>Upload 1 supported file: PDF. Max 10 MB.</span>
      </div>
      <div>
        <h3>
          Are you available for face-to-face meetups should certain companies
          request for it? (Note that we will probably meet around UPD/Katipunan
          area.)
        </h3>
        <input type="radio" name="faceToFace" id="yes" />
        <label htmlFor="yes">Yes, I am willing to attend.</label>
        <input type="radio" name="faceToFace" id="yes" />
        <label htmlFor="yes">No, I would prefer it to be an online call.</label>
      </div>
    </div>
  );
}
