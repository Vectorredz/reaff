import Logistics from "./concerns-pages/Logistics"
import Membership from "./concerns-pages/Membership"
import Records from "./concerns-pages/Records"
import Education from "./concerns-pages/Educations"
import PublicRelations from "./concerns-pages/PublicRelations"
import Publicity from "./concerns-pages/Publicity" 
import Marketing from "./concerns-pages/Marketing"
import Submit from "../../../components/Submit"
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