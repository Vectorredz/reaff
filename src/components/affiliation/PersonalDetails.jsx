import '../../styles/components.css'
import { useEffect, useState } from 'react'
import { useOutletContext, Link, useNavigate } from 'react-router'

export default function PersonalDetails() {
    const { formData, setFormData } = useOutletContext()
    const [ complete, setComplete ] = useState(false)
    const Navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value, type, checked} = e.target
        setFormData((prev) => ({
            ...prev, 
            personalInfo: {
                ...prev.personalInfo,
                [name]: type === 'checkbox' ? checked : value
            }
        }))
    }

    useEffect(() => {
        if (Object.values(formData.personalInfo).every(value => value !== '')){
            setComplete(true)
        }
        else {
            setComplete(false)
        }
    }, [formData.personalInfo])

    return (
        <div
            className="border min-w-[48rem] p-6 space-y-8"
        >
            {/* Personal Info */}
            <div>
                <h1 className="text-lg font-semibold mb-4">Personal Info</h1>
                <p>{formData.personalInfo.firstName}</p>
                <div className="flex gap-4">
                    <input name="firstName" className="text-field" placeholder="First Name" value={formData.personalInfo?.firstName} onChange={handleChange}  />
                    <input name="lastName" className="text-field" placeholder="Last Name" value={formData.personalInfo?.lastName} onChange={handleChange}  />
                </div>

                <div className="flex gap-4 mt-4">
                    <input name="middleName" className="text-field" placeholder="Middle Name" value={formData.personalInfo?.middleName} onChange={handleChange} />
                    <input name="suffix" className="text-field" placeholder="Suffix" value={formData.personalInfo?.suffix} onChange={handleChange} />
                </div>

                <div className="flex gap-4 mt-4 items-center">
                    <input name="nickname" className="text-field" placeholder="Nickname" value={formData.personalInfo?.nickname} onChange={handleChange} />

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            name="preferredName"
                            checked={formData.personalInfo?.preferredName}
                            onChange={handleChange}
                        />
                        Preferred name
                    </label>
                </div>

                <div className="flex gap-4 mt-4">
                    <input
                        name="birthday"
                        type="date"
                        className="text-field"
                        value={formData.personalInfo?.birthday}
                        onChange={handleChange}
                        
                    />
                </div>
            </div>

            {/* Student Info */}
            <div>
                <h1 className="text-lg font-semibold mb-4">Student Info</h1>

                <div className="flex gap-4">
                    <input name="year" className="text-field" placeholder="Year" value={formData.personalInfo?.year} onChange={handleChange} />
                    <input name="degreeProgram" className="text-field" placeholder="Degree Program" value={formData.personalInfo?.degreeProgram} onChange={handleChange} />
                </div>

                <div className="flex gap-4 mt-4">
                    <input name="college" className="text-field" placeholder="College" value={formData.personalInfo?.college} onChange={handleChange} />
                    <input name="expectedGradYear" className="text-field" placeholder="Expected Graduation Year" value={formData.personalInfo?.expectedGradYear} onChange={handleChange} />
                </div>
            </div>

            {/* Contact Info */}
            <div>
                <h1 className="text-lg font-semibold mb-4">Contact Info</h1>

                <div className="flex gap-4">
                    <input name="primaryEmail" className="text-field" placeholder="Primary Email" value={formData.personalInfo?.primaryEmail} onChange={handleChange} />
                    <input name="upEmail" className="text-field" placeholder="UP Email" value={formData.personalInfo?.upEmail} onChange={handleChange} />
                </div>

                <div className="flex gap-4 mt-4">
                    <input name="phone" className="text-field" placeholder="Phone Number" value={formData.personalInfo?.phone} onChange={handleChange} />
                    <input name="telephone" className="text-field" placeholder="Telephone" value={formData.personalInfo?.telephone} onChange={handleChange} />
                </div>
            </div>

            {/* Emergency Contact */}
            <div>
                <h1 className="text-lg font-semibold mb-4">Emergency Contact</h1>

                <div className="flex gap-4">
                    <input name="emergencyName" className="text-field" placeholder="Contact Person" value={formData.personalInfo?.emergencyName} onChange={handleChange} />
                    <input name="emergencyRelation" className="text-field" placeholder="Relation" value={formData.personalInfo?.emergencyRelation} onChange={handleChange} />
                    <input name="emergencyPhone" className="text-field" placeholder="Contact Number" value={formData.personalInfo?.emergencyPhone} onChange={handleChange} />
                </div>
            </div>

            {/* Others */}
            <div>
                <h1 className="text-lg font-semibold mb-4">Others</h1>

                <div className="flex gap-4">
                    <input name="mbti" className="text-field" placeholder="MBTI" value={formData.personalInfo?.mbti} onChange={handleChange} />
                    <input name="discord" className="text-field" placeholder="Discord Tag" value={formData.personalInfo?.discord} onChange={handleChange} />
                    <input name="facebook" className="text-field" placeholder="Facebook Profile Link" value={formData.personalInfo?.facebook} onChange={handleChange} />
                </div>
            </div>

            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={(e)=>{
                    e.preventDefault()
                    console.log(formData)
                    complete && Navigate('committee-concerns')
                        }
                    }>
                    Next
            </button>
        </div>
    )
}
