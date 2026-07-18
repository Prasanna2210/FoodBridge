const LoadingButton = ({
  loading,
  children,
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <span className="flex justify-center items-center gap-2">
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          Please wait...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;