export default function Header({ page, title }) {
    return (
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">ACM Member Affiliation Form</h1>
          <p className="text-sm text-gray-600">
            Step {page} of 5 · {title}
          </p>
        </div>
    )
}