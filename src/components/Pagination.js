const Pagination = () => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 gb-gray-200 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
