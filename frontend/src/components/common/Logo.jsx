const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white text-2xl">
        🍽️
      </div>

      <div>
        <h1 className="text-xl font-bold text-emerald-600">
          FoodBridge
        </h1>

        <p className="text-xs text-gray-500">
          Feed People, Not Landfills
        </p>
      </div>
    </div>
  );
};

export default Logo;