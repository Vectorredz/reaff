import { useNavigate } from 'react-router'

export default function Events() {
  const Navigate = useNavigate();


  return (
    <div className="form">
      {/* Intro */}
      <div className="space-y-4">
        <p>
          This upcoming academic year, we have several projects lined up.
          We would like to know if you are interested in participating in
          any of them.
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>UP ACM Fest</strong> – UP ACM's anniversary celebration,
            usually featuring talks from industry professionals and a game
            day for members (typically held in March or April).
          </li>
          <li>
            <strong>Algolympics 2026</strong> – Our flagship event and a
            national coding competition, likely held around February 2026.
          </li>
          <li>
            <strong>Easy as Py</strong> – A community-building event where
            we teach high school students basic Python.
          </li>
          <li>
            <strong>UP ACM Elections</strong> – Join an ad hoc committee in
            charge of organizing the election of officers.
          </li>
          <li>
            <strong>teACh Me</strong> – An internal event focused on
            upskilling and skills transfer between members and invited
            speakers on topics such as computer science, time management,
            financial planning, and selected hobbies.
          </li>
          <li>
            <strong>SIGs (Special Interest Groups)</strong> – Groups focused
            on specific topics such as AI and web development, where members
            work on mini-projects for their portfolio.
          </li>
          <li>
            <strong>ACMeets</strong> – Hangout sessions with ACM members,
            including brown bag sessions, sportsfests, gaming, watch
            parties, and more.
          </li>
        </ol>
      </div>

      {/* Easy as Py */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          Are you interested in being the Easy as Py project head?
        </h2>
        <p>
          You do not need to be the Education head or a member of the
          Education committee to participate. If you have a passion for
          teaching and want to gain leadership experience in handling a
          smaller event, this is for you. Answering “yes” does not serve as
          a final commitment—it is simply an interest check. If you have
          questions about the responsibilities involved, feel free to ask
          any council member.
        </p>
        <input type="radio" name="eap" id="yes" /><label htmlFor="yes">yes</label>
        <input type="radio" name="eap" id="no" /><label htmlFor="no">no</label>
        <input type="radio" name="eap" id="maybe" /><label htmlFor="maybe">maybe</label>
      </div>

      {/* Algolympics */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          Are you interested in being the Algolympics project head?
        </h2>
        <p>
          Do you want to gain experience in handling a large-scale coding
          event? Answering “yes” does not serve as a final commitment—it is
          simply an interest check. If you have questions about the
          responsibilities involved, feel free to ask any council member.
        </p>
        <input type="radio" name="algo" id="yes" /><label htmlFor="yes">yes</label>
        <input type="radio" name="algo" id="no" /><label htmlFor="no">no</label>
        <input type="radio" name="algo" id="maybe" /><label htmlFor="maybe">maybe</label>
      </div>

      {/* Web */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          Do you have experience with frontend and/or backend development?
        </h2>
        <p>
          We are looking for members who would like to help maintain our
          website. While the website is already live, we may need help with
          updates for events such as Algolympics and others. This role will
          serve as the web master, and members in this role may be exempt
          from heavier event workloads, as their primary responsibility
          will be website-related.
        </p>
        <input type="radio" name="webdev" id="exp" />Interested with experience<label htmlFor="yes">yes</label>
        <input type="radio" name="webdev" id="noExp" />Interested with no experience<label htmlFor="no">no</label>
        <input type="radio" name="webdev" id="no" />Not interested<label htmlFor="maybe">maybe</label>
      </div>

      {/* AWS */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
Do you have experience with Cloud Technologies? (AWS)         </h2>
        <p>
         We are looking for people who are up for the challenge of cloud hosting our competition platforms for Algolympics.
        </p>
        <input type="radio" name="clouddev" id="exp" />Interested with experience<label htmlFor="yes">yes</label>
        <input type="radio" name="clouddev" id="noExp" />Interested with no experience<label htmlFor="no">no</label>
        <input type="radio" name="clouddev" id="no" />Not interested<label htmlFor="maybe">maybe</label>
      </div>

      {/* Ad hoc */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
Operations Ad Hoc Committee</h2>
        <p>
         The operations ad hoc committee is a separate committee designed to give portfolio ready project to work on. Develop tools and applications that help streamline or automate the operations within the organization. 
        </p>
        <p>
          Note that being a part of the operations ad hoc committee won't exempt you from your regular committee responsibilities. 
        </p>
        <input type="radio" name="operations" id="yes" /><label htmlFor="yes">Interested</label>
        <input type="radio" name="operations" id="no" /><label htmlFor="no">Not Interested</label>
      </div>

      {/* teACh Me */}
      <div>
                <h2 className="text-lg font-semibold">
teACh Me</h2>
        <p>What topics would you be interested in joining for teACh Me</p>
        <p>*
teACh Me is a 1–2 day workshop where you get to dive into a topic you’re curious about.  You’ll be working hands-on and walking away with something cool you can show off or keep building on. Since our instructors put a lot of effort into running these workshops, we do ask for commitment for the full duration, but trust us, it’ll be worth it. </p>
<input type="checkbox" name="teachme" id="pokemon"/><label htmlFor="">Pokemon Showdown</label>
<input type="checkbox" name="teachme" id="git"/><label htmlFor="">Git/Github</label><input type="checkbox" name="teachme" id="other"/><label htmlFor="other">other:</label>
<input type="text" className='text-field' name="" id="" />

      <p>What topics would you be enthusiastic to personally teach for a teAChMe session?</p>
      <input type="text" className="text-field" id="" />

      <p>What topics do you want to see for future teAChMe sessions?
</p>
      <input type="text" classNname="text-field" id="" />
      </div>
     
      <button
        className='btn-primary'
        onClick={(e) => {
          e.preventDefault();
          Navigate('/signup/organization-related/concerns');
        }}>
          Next
      </button>
    </div>
  );
}
