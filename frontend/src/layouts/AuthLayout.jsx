import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-600">
            🍽️ FoodBridge
          </h1>

          <p className="text-gray-600 mt-2">
            Reducing Food Waste, Feeding Communities
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-center text-gray-800">
            {title}
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-6">
            {subtitle}
          </p>

          {children}

        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          © {new Date().getFullYear()} FoodBridge
        </p>

      </div>

    </div>
  );
};

export default AuthLayout;