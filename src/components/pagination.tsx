"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

const Pagination = ({totalItems,itemsPerPage,currentPage,}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "border border-gray-300 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))} */}



      {/* {(() => {
        const pagesToShow = 3;
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
        
        
        
        // First page
        if (startPage > 1) {
          pages.push(1);
          if (startPage > 2) {
            pages.push('...');
          }
        }
        
        // Middle pages
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        
        // Last page
        if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            pages.push('...');
          }
          pages.push(totalPages);
        }

        return pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={index} className="px-3 py-1">...</span>
            );
          }
          return (
            <button
              key={page}
              onClick={() => handlePageChange(Number(page))}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        });
      })()} */}



{(() => {
        const pagesToShow = 5;
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
        
        const pages = [];
        
        // Add pages from startPage to endPage
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        return pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(Number(page))}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ));
      })()}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
