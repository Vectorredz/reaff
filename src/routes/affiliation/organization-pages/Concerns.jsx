import Committee from "./concerns-pages/concerns"
import { useNavigate } from 'react-router'


export default function Concerns() {
    const Navigate = useNavigate();


    return (
        <div className='form'>
            <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">ACM Member Affiliation Form</h1>
          <p className="text-sm text-gray-600">
            Step 3 of 5 · Organization Related | Committee-specific Concerns
          </p>
        </div>
            <Committee/>
            {/* <Records/>
            <Logistics/>
            <Education/>
            <Publicity/>    
            <Marketing/>
            <PublicRelations/> */}
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