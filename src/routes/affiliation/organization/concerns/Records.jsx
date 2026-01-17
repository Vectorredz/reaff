export default function Records() {
    return (
        <div>
            <h2>Records Committee Concerns</h2>
            <div>
                <h3>Are you interested in helping Records for this sem's Automaton?</h3>
                <p>Automaton is a newsletter / trivia posts, all about general tech, computing, ACM, and more. We're looking for individuals interested in research and writing to help us! You can look at UP ACM's FB page back in 2022 for some examples.</p>
                <div>
                    <input type="radio" name="automaton" id="yes" /><label htmlFor="">Yes</label>
                    <input type="radio" name="automaton" id="no" /><label htmlFor="">No</label>
                    <input type="radio" name="automaton" id="maybe" /><label htmlFor="">Maybe</label>
                </div>
            </div>
            <div>
                <h3>Please upload a copy of your Form 5</h3>
                <p>
                    This will be used for our organization recognition application for the College of Engineering. If your form 5 is not yet available, you may choose to edit this google forms later or submit it to Syrelle (Membership Head) later.
                </p>
                <p>Upload 1 supported file. Max 100 MB.</p>
                <input type="file" name="" id="" />
            </div>
            <div>
                <h3>Please upload a copy of your UP ID (If you don't have one yet, any ID will do.) </h3>
                <p>This will also be used for our organization recognition application</p>
                <p>Upload 1 supported file. Max 100 MB.</p>
                <input type="file" name="" id="" />
            </div>
        </div>
    )
}