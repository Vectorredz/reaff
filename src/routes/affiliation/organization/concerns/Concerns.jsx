import Logistics from "./Logistics"
import Membership from "./Membership"
import Records from "./Records"
import Education from "./Educations"
import PublicRelations from "./PublicRelations"
import Publicity from "./Publicity" 
import Marketing from "./Marketing"
import Submit from "../../../../components/Submit"
import { useNavigate } from 'react-router'


export default function Concerns() {
    const Navigate = useNavigate();


    return (
        <div className='form'>
            <div>
                <h2>Committee-specific concerns</h2>
            </div>
            <Membership/>
            <Records/>
            <Logistics/>
            <Education/>
            <Publicity/>    
            <Marketing/>
            <PublicRelations/>
            <button
                className='btn-primary'
                onClick={(e) => {
                    e.preventDefault()
                    Navigate('../../create-account')
                }}
                >
                Next
            </button>
        </div>
    )
}