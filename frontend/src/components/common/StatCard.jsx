const StatCard = ({ title, value, color }) => {
  return (
    <div
      className={`rounded-xl p-6 shadow text-white ${color}`}
    >
      <h3 className="text-lg">{title}</h3>

      <p className="text-4xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
};

export default StatCard;