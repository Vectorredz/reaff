export default function Publicity() {
  return (
    <div>
      <h2>Publicity Committee Concerns</h2>
      <div>
        <h3>
          Attach a picture of you that you would like us to use in our pubs!
        </h3>
        <p>
          This would be used in official UP ACM Publicity Materials. Please
          upload a good-looking picture of yourself! If you don't upload a
          photo, we will choose a photo of you at our own discretion.{" "}
        </p>
        <span>Upload 1 supported file: image. Max 10 MB.</span>
        <input type="file" name="" id="" />
      </div>
      <div>
        <h3>
          Do you want to be greeted by Jammond in the ACM Resident GC on your
          birthday?
        </h3>
        <div>
          <input type="radio" name="greeting" id="yes" />
          <label htmlFor="yes">Yes</label>
          <input type="radio" name="greeting" id="no" />
          <label htmlFor="no">No</label>
        </div>
      </div>
    </div>
  );
}
