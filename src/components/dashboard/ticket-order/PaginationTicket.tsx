interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PaginationTicket = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex gap-x-2 mt-4">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200' : 'bg-green-600 text-white'}`}
            >
                Previous
            </button>
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded ${page === currentPage ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                >
                    {page}
                </button>
            ))}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200' : 'bg-green-600 text-white'}`}
            >
                Next
            </button>
        </div>
    );
};

export default PaginationTicket;