import { useOutlet, useOutletContext } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { UtilsDB } from "../../contexts/UtilitiesContext"
import Header from "../../components/Header";
import contents from "../../data/contents.json";
import Footer from "../../components/Footer";
export default function Payment() {
  const { form, page, setPage, clearLocalStorage } = useOutletContext();
  const { validationUtils } = UtilsDB();
  useEffect(() => {
    setPage(5);
  }, []);
  const content = contents.payment;
  return (
    <div className="form-frame">
      <div className="form space-y-8">
        <Header page={page} title="Payment" />
        {/* Rationale */}
        <section className="form-section">
          <h2 className="section-title">{content.rationale.title}</h2>
          <div>
            Since we are slowly transitioning to having more face-to-face
            activities, we will be reinstating a renewal fee to prepare for our
            face to face events. This year we will have a fee of{" "}
            {content.rationale.details.fee} Php. *Members that already paid the
            renewal fee for the first semester do not need to pay for the second
            semester You may send your reaff fee to the following Gcash account
            and send the receipt to our Finance{" "}
            {content.rationale.details.position}{" "}
            {content.rationale.details.pointPerson}:
            <div className="flex flex-col">
              <span>
                {content.rationale.details.position} Name:{" "}
                {content.rationale.details.pointPerson}
              </span>

              <span>Number: {content.rationale.details.number}</span>
            </div>
          </div>
        </section>
        <section className="form-section">
          <h2 className="section-title">QR code</h2>
          <h3>Gcash</h3>
          <div></div>
          <h3>Maya</h3>
          <div></div>
        </section>
        <Footer
          validateForm={validationUtils.validateForm}
          clearLocalStorage={clearLocalStorage}
          details={[form, "payment"]}
          nextPage="create-account"
        ></Footer>
      </div>
    </div>
  );
}
