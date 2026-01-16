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
      </div>

      {/* SIGs */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          Would you be interested in joining one of the Special Interest
          Groups (SIGs)?
        </h2>
        <p className="text-sm text-gray-500">
          Tentative topics: Data Analytics, Data Science, Artificial
          Intelligence
        </p>
        <p>
          Special Interest Groups are designed to facilitate structured
          learning opportunities for our members. Joining a group is a
          great way to work on a personal project for your coding
          portfolio. While participation requires commitment, we will
          ensure that the experience is worthwhile. If you have any
          questions, feel free to message a member of the council.
        </p>
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
