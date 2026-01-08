import { useOutletContext } from 'react-router' 

export default function Commitments() {
    const { formData, setFormData } = useOutletContext();

    return (    
        <div
            className="border min-w-[48rem] p-6 space-y-8"
        >
            <div>
                <h2>Type of membership</h2>
                <input name='member' id='newMember' type="radio" /><label for='newMember'> New Member</label>
                <input name='member' id='activeMember' type="radio" /><label for='activeMember'> Active Member</label>
                <input name='member' id='returningMember' type="radio" /><label for='returningMember'> Returning Member</label>

            </div>
            <div>
                <h2>Other Organization within UP</h2>
                <input type="text" />
            </div>
            <div>
                <h2>Other Organization beyond UP</h2>
                <input type="text" />
            </div>
            <div>
                <h2>Other significant priorities</h2>
                <input type="text" />
            </div>
            <div>
                <h2>Special Concerns</h2>
                <div>
                    <h2>Academic Concerns</h2>
                </div>
                <div>
                    <h2>Health Concerns</h2>
                </div>
                <div>
                    <h2>Personal or interpersonal concern</h2>
                </div>
                <div>
                    <h2>Other concerns</h2>
                </div>
            </div>
        </div>
    )
}