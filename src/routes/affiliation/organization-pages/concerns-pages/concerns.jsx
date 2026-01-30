import contents from "../../../../data/contents.json";
import { useOutletContext } from "react-router";
import Organization from "../../Organization";
import { useEffect } from "react";
export default function Committee() {
  const { formData, setFormData, localStorage, setLocalStorage } =
    useOutletContext();

  const updateRadio = (prev, comm, name, value) => {
    return {
      ...prev,
      organization: {
        ...prev.organization,
        committee: {
          ...prev.organization.committee,
          [comm]: {
            ...prev.organization.committee[comm],
            [name]: value,
          },
        },
      },
    };
  };

  const updateText = (prev, comm, name, value) => {
    return {
      ...prev,
      organization: {
        ...prev.organization,
        committee: {
          ...prev.organization.committee,
          [comm]: {
            ...prev.organization.committee[comm],
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
      setLocalStorage((prev) =>
        updateText(prev, committee, name, e.target.value),
      );
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div>
      <div>
        {Object.keys(contents.committee_concerns_pages).map(
          (committee, key) => {
            return (
              <div key={key}>
                <h2 className="text-2xl">{committee}-specific Concerns</h2>
                {contents.committee_concerns_pages[committee].map(
                  (item, key) => (
                    <div key={key}>
                      {item.question && (
                        <div>
                          <strong>{item.question}</strong>
                        </div>
                      )}
                      {item.type === "text" && (
                        <div>
                          <input
                            type="text"
                            className="text-field"
                            name={item.id}
                            value={
                              localStorage.organization.committee[committee][
                                item.id
                              ] || ""
                            }
                            onChange={(e) => handleChange(e, committee)}
                          />
                        </div>
                      )}
                      {item.type === "file" && (
                        <div>
                          <input type="file" name={item.id} />
                        </div>
                      )}

                      {item.type === "radio" && (
                        <div>
                          {
                            item.options.map((option, index) => {
                              return (
                                <div key={index}>
                                  <input 
                                    type="radio" 
                                    name={option.name}
                                    id={option.id} 
                                    onChange={(e) => handleChange(e, committee)}
                                    checked={
                                      localStorage.organization.committee[
                                        committee
                                      ][option.name] === option.id
                                    }
                                  />
                                  <label htmlFor={option.id}>{option.title}</label>
                                </div>
                              )
                            })
                          }
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

//  <div>
//                           {item.options.map((option) => {
//                             <div>
//                               <input
//                                 name={option}
//                                 type="radio"
//                                 id={option}
//                                 onChange={(e) => handleChange(e, committee)}
//                                 checked={
//                                   localStorage.organization.committee[
//                                     committee
//                                   ][item.id] === "yes"
//                                 }
//                               />
//                               <label htmlFor="yes">Yes</label>
//                             </div>;
//                           })}
//                         </div>
//       <ul>
//         {contents?.committee_concerns_pages?.map(
//           (item, index) => {console.log(item)}
//         )}

//       </ul>

//     </div>
//   );
// }

// return (
//   <li key={index}>
//     <strong>
//       <p>{item.question}</p>
//     </strong>
//     <p>{item.description}</p>
//     {item.type === "radio" && (
//       <div>
//         <input
//           name={item.id}
//           type="radio"
//           id="yes"
//           onChange={handleChange}
//           checked={
//             localStorage.organization.committee.membership[item.id] === "yes"
//           }
//         />
//         <label htmlFor="yes">Yes</label>
//         <input
//           name={item.id}
//           type="radio"
//           id="no"
//           onChange={handleChange}
//           checked={
//             localStorage.organization.committee.membership[item.id] === "no"
//           }
//         />
//         <label htmlFor="no">No</label>
//         <input
//           name={item.id}
//           type="radio"
//           id="maybe"
//           onChange={handleChange}
//           checked={
//             localStorage.organization.committee.membership[item.id] === "maybe"
//           }
//         />
//         <label htmlFor="maybe">Maybe</label>
//       </div>
//     )}
//     {item.type === "text" && (
//       <div>
//         <input
//           className="text-field"
//           name={item.id}
//           type="text"
//           id="Yes"
//           value={localStorage.organization.committee.membership[item.id] || ""}
//           onChange={handleChange}
//         />
//       </div>
//     )}
//   </li>
// );
//       },
//     )}

