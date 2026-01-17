export default function Logistics() {
  return (
    <div>
      <div>
        <h3>
          What is your download speed (in Mbps) based on{" "}
          <a href="www.speedtest.net">speedtest.net?</a>
        </h3>
      </div>
      <div>
        <h3>
          What is your upload speed (in Mbps) based on{" "}
          <a href="www.speedtest.net">speedtest.net?</a>
        </h3>
      </div>
      <div>
        <h3>What type of gadgets do you own?</h3>
        <div>
          <input type="checkbox" name="gadgets" id="tablet" />
          <label htmlFor="tablet">Tablet</label>
          <input type="checkbox" name="gadgets" id="smartphone" />
          <label htmlFor="smartphone">Smartphone</label>
          <input type="checkbox" name="gadgets" id="laptop" />
          <label htmlFor="laptop">Laptop</label>
          <input type="checkbox" name="gadgets" id="computer" />
          <label htmlFor="computer">Personal Computer</label>
          <input type="checkbox" name="gadgets" id="other" />
          <label htmlFor="other">Other</label>
          <input type="text" name="" id="" />
        </div>
      </div>
    </div>
  );
}
