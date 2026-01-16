const steps = [
  "Personal details",
  "Commitments",
  "Organization-related",
  "Payment",
];

export default function Navbar({ currentStep }) {
  return (
    <nav className="min-w-[65rem] p-6 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-center">
        <h1 className="text-xl font-semibold">
          ACM Affiliation Form
        </h1>
      </div>

      {/* Stepper */}
      <ul className="flex items-center justify-between relative">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <li
              key={label}
              className="relative flex flex-1 items-center justify-center"
            >
              {/* Step content */}
              <div className="flex flex-col items-center gap-3 z-10">
                {/* Number box */}
                <div
                  className={`
                    flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : isCompleted
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-300 text-gray-600"
                    }
                  `}
                >
                  {stepNumber}
                </div>

                {/* Label */}
                <span
                  className={`text-sm font-medium text-center ${
                    isActive ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
              </div>

              {/* Connector */}
              {!isLast && (
                <div
                  className={`
                    absolute top-6 left-1/2 h-1 w-full
                    ${
                      isCompleted
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }
                  `}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
