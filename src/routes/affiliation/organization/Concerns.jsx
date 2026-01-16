export default function Concerns() {
    return (
        <div className='form'>
            <div>
                <h2>Committee-specific concerns</h2>
                <p>Membership Committee Concerns</p>
            </div>
            <div >
                <p>A buddy will be an applican't point person and hopefully first friend to help them with their app process</p>
                <input name='buddy' type="radio" id='Yes'/><label htmlFor="yes">Yes</label>
                <input name='buddy' type="radio" id='No' /><label htmlFor="No">No</label>
                <input name='buddy' type="radio" id='Maybe'/><label htmlFor="Maybe">Maybe</label>
            </div>
            <div>
                <p>
                    What kind of activities do you want to see for ACMeets? *Examples: Review sessions, Sportsfest, Food trip sa A2, etc.
                </p>
                <input type="text" className='text-field' name="" id="" />
            </div>
            <div>
                <h2>
                    Are you interested in joining a sportsfest?
                </h2>
                <input name='sportsfest' type="radio" id='Yes'/><label htmlFor="yes">Yes</label>
                <input name='sportsfest' type="radio" id='No' /><label htmlFor="No">No</label>
                <input name='sportsfest' type="radio" id='Maybe'/><label htmlFor="Maybe">Maybe</label>
            </div>
            <div>
                <h2>Are you G for face to face activities? </h2>
                <input name='faceToFace' type="radio" id='Yes'/><label htmlFor="yes">Yes</label>
                <input name='faceToFace' type="radio" id='No' /><label htmlFor="No">No</label>
                <input name='faceToFace' type="radio" id='Depends'/><label htmlFor="Depends">Depends</label>
            </div>
            <div>
                <h2>If your answer was "No" or "Depends", why? (i.e. home is far from campus)</h2>
                <input type="text" className='text-field' />
            </div>
            <div>
                <h2>Does your computer/laptop have a dedicated GPU *
This is to sense if the computers of ACMems are capable of running potential games for game nights.</h2>

            </div>
            <div>
                <h2>A skill I would like to learn this semester is...</h2>
                <input type="text" name="" className='text-field' id="" />
            </div>
            <div>
                <h2>I'd tambay with UP ACM if
What would make you join org events? (even non-official or chill/hangout events ;) )</h2>
            <input type="text" className="text-field" />
            </div>
            <div>
                <h2>Kindly list the multiplayer games that you currently play & willing to play with ACMems (i.e. Valorant, Fortnite, Minecraft)</h2>
                
            </div>
        </div>
    )
}