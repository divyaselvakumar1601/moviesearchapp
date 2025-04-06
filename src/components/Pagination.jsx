const Pagination = ({ currentPage, totalResults, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="flex justify-center gap-4 my-8">
      {currentPage > 1 && (
        <button
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}
      <span className="px-5 py-2 bg-gray-800 text-white rounded-md">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <button
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;