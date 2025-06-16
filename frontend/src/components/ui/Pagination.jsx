import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    let addedDots = false;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
        addedDots = false;
      } else if (!addedDots) {
        pages.push('...');
        addedDots = true;
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
      <button
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
          ${currentPage === 1
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gray-800 hover:bg-blue-600 hover:text-white text-white'}
        `}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {getPageNumbers().map((num, i) => (
        <button
          key={i}
          className={`min-w-[40px] px-3 py-2 rounded-md text-sm font-medium transition-all
            ${num === '...'
              ? 'text-gray-500 cursor-default'
              : num === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-white hover:bg-blue-500'}
          `}
          onClick={() => typeof num === 'number' && onPageChange(num)}
          disabled={num === '...'}
        >
          {num}
        </button>
      ))}

      <button
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
          ${currentPage === totalPages
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gray-800 hover:bg-blue-600 hover:text-white text-white'}
        `}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}
