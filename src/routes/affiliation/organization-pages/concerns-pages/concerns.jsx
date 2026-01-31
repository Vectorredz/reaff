import contents from "../../../../data/contents.json";
import { useOutletContext } from "react-router";
import Organization from "../../Organization";
import { useEffect } from "react";
export default function Committee() {
  const { formData, setFormData, localStorage, setLocalStorage } = useOutletContext();

  // little hack for changing code to title
  const committeeDecode = (code) => {
    switch (code) {
      case "logistics":
        return "Logistics";
      case "publicRelations":
        return "Public Relations";
      case "publicity":
        return "Publicity";
      case "marketing":
        return "Marketing";
      case "records":
        return "Records";
      case "membership":
        return "Membership";
      case "educations":
        return "Educations";
    }
  };

  const updateRadio = (prev, comm, name, value) => {
    return {
      ...(prev ?? formData),
      organization: {
        ...(prev?.organization ?? formData?.organization),
        committee: {
          ...(prev.organization.committee ?? formData?.organization?.committee),
          [comm]: {
            ...(prev.organization.committee[comm] ??
              formData?.organization?.committee[comm]),
            [name]: value,
          },
        },
      },
    };
  };

  const updateText = (prev, comm, name, value) => {
    return {
      ...(prev ?? formData),
      organization: {
        ...(prev.organization ?? formData?.organization),
        committee: {
          ...(prev.organization.committee ?? formData?.organization?.committee),
          [comm]: {
            ...(prev.organization.committee[comm] ??
              formData?.organization?.committee[comm]),
            [name]: value,
          },
        },
      },
    };
  };
  const handleChange = (e, committee) => {
    const { name, id, type } = e.target;
    console.log("test", e.target, committee);
    if (type === "radio") {
      setFormData((prev) => updateRadio(prev, committee, name, id));
      setLocalStorage((prev) => updateRadio(prev, committee, name, id));
    } else {
      setFormData((prev) => updateText(prev, committee, name, e.target.value));
      setLocalStorage((prev) => updateText(prev, committee, name, e.target.value));
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div>
      <div>
        {Object.keys(contents?.committee_concerns_pages).map(
          (committee, key) => {
            return (
              <div key={key}>
                <h2 className="text-2xl">
                  {committeeDecode(committee)}-specific Concerns
                </h2>
                {contents?.committee_concerns_pages[committee].map(
                  (item, key) => (
                    <div key={key}>
                      {item?.question && (
                        <div>
                          <strong>{item?.question}</strong>
                        </div>
                      )}
                      {item?.type === "text" && (
                        <div>
                          <input
                            type="text"
                            className="text-field"
                            name={item?.id}
                            value={
                              localStorage?.organization?.committee[committee][
                                item.id
                              ] || ""
                            }
                            onChange={(e) => handleChange(e, committee)}
                          />
                        </div>
                      )}
                      {item?.type === "file" && (
                        <div>
                          <input type="file" name={item?.id} />
                        </div>
                      )}

                      {item?.type === "radio" && (
                        <div>
                          {item?.options.map((option, index) => {
                            return (
                              <div key={index}>
                                <input
                                  type="radio"
                                  name={option?.name}
                                  id={option?.id}
                                  onChange={(e) => handleChange(e, committee)}
                                  checked={
                                    localStorage?.organization?.committee[committee][
                                      option?.name
                                    ] === option?.id
                                  }
                                />
                                <label htmlFor={option?.id}>
                                  {option?.title}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ),
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
