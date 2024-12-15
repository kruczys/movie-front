interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       onPageChange
                                   }: PaginationProps) {
    return (
        <div className="flex justify-center space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-4 py-2 rounded border disabled:opacity-50"
            >
                Previous
            </button>
            <span className="px-4 py-2">
        Page {currentPage + 1} of {totalPages}
      </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-4 py-2 rounded border disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}