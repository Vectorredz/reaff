import { useNavigate } from 'react-router'
export default function Preferences() {
  const Navigate = useNavigate()
  const tops = [1, 2, 3];

  return (
    <div className="form">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold">
        Committee Preference
      </h2>

      {/* Primer Section */}
      <div className="space-y-2 rounded-lg border border-gray-300 p-5">
        <h3 className="text-lg font-medium">
          2526 UP ACM Committee Primer
        </h3>
        <p className="text-sm text-gray-600">
          Check out the Committee Primer to learn more about each committee.
          <a
            href="/"
            className="ml-1 text-blue-600 hover:underline"
          >
            See primer here
          </a>
        </p>
      </div>

      {/* Preferences Section */}
      <div className="space-y-8">
        <h3 className="text-xl font-semibold">
          Committee Preference
        </h3>

        {/* Drag and Drop Placeholder */}
        <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-gray-400">
          Insert Drag and Drop here
        </div>

        {/* Preference Evaluation */}
        <p className="text-sm text-gray-500">
          Preference Evaluation
        </p>

        {/* Top Preferences */}
        {tops.map((top) => (
          <div
            key={top}
            className="space-y-4 rounded-lg border border-gray-300 p-5"
          >
            <h4 className="text-base font-medium">
              Top {top} Preferred Committee
            </h4>

            {/* Reason */}
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Reason for preference *
              </label>
              <textarea
                className="text-field min-h-[100px]"
                placeholder="Experience, skills, motivation, or what you can contribute"
                required
              />
            </div>

            {/* Expectation */}
            <div className="space-y-1">
              <label className="text-sm font-medium">
                What you expect from this committee
              </label>
              <textarea
                className="text-field min-h-[80px]"
                placeholder="What do you hope to learn or experience?"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        className='btn-primary'
        onClick={(e) => {
          e.preventDefault()
          Navigate('/signup/organization-related/events')
        }}>
        Next
      </button>
    </div>
  );
}
