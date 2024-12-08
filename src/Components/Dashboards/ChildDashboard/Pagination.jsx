import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };
    const handlePageClick = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };
    const renderPageNumbers = () => {
        let pages = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + 1);

        // Loop through and display the pages in the calculated range
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i}>
                    <button
                        onClick={() => handlePageClick(i)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-100 ${currentPage === i
                            ? 'text-black border-black bg-gray-200 hover:bg-gray-300' // Highlight the current page
                            : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        disabled={currentPage === i} // Disable button for the current page
                    >
                        {i} {/* Display page number */}
                    </button>
                </li>
            );
        }
        return pages;
    };

    return (
        totalPages > 1 &&
        <nav className='flex justify-center' aria-label="Page navigation example">
            <ul className="flex items-center space-x-2 h-8 text-sm">
                {/* First Page Button */}
                {currentPage > 3 && (
                    <li>
                        <button
                            onClick={() => handlePageClick(1)}
                            className="flex items-center justify-center px-3 h-8 leading-tight border border-gray-100 text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 rounded-lg"
                        >
                            <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1 5 5l4 4M5 1 1 5l4 4" />
                            </svg>
                        </button>
                    </li>
                )}

                {/* Previous Button */}
                <li>
                    <button
                        onClick={handlePrevious}
                        className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-100 rounded-lg ${currentPage === 1
                            ? 'text-gray-300 bg-gray-100 cursor-not-allowed'
                            : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        disabled={currentPage === 1} // Disable button if on the first page
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="w-2.5 h-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                    </button>
                </li>

                {/* Page Numbers */}
                {renderPageNumbers()}

                {/* Next Button */}
                <li>
                    <button
                        onClick={handleNext}
                        className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-100 rounded-lg ${currentPage === totalPages
                            ? 'text-gray-300 bg-gray-100 cursor-not-allowed'
                            : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        disabled={currentPage === totalPages} // Disable button if on the last page
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="w-2.5 h-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </button>
                </li>

                {/* Last Page Button */}
                {currentPage < totalPages - 2 && (
                    <li>
                        <button
                            onClick={() => handlePageClick(totalPages)}
                            className="flex items-center justify-center px-3 h-8 leading-tight border border-gray-100 text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 rounded-lg"
                        >
                            <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4-4 4m4-8 4 4-4 4" />
                            </svg>
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
