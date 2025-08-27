import { Link } from "@inertiajs/react";

export default function Pagination({
    paginationData,
    routePath = "all-orders",
}) {
    console.log(paginationData);
    return (
        <div className="flex justify-center gap-4 my-4">
            <Link
                onClick={(e) => {
                    if (paginationData.current_page === 1) {
                        e.preventDefault();
                    }
                }}
                href={
                    `/admin/${routePath}` +
                    "?page=" +
                    (paginationData.current_page - 1)
                }
                className={`cursor-pointer border px-3 py-1 rounded-md bg-blue-600 ${
                    paginationData.current_page === 1
                        ? "opacity-50 cursor-default"
                        : ""
                } `}
            >
                Previous
            </Link>
            <Link
                onClick={(e) => {
                    if (
                        paginationData.current_page === paginationData.last_page
                    ) {
                        e.preventDefault();
                    }
                }}
                href={
                    `/admin/${routePath}` +
                    "?page=" +
                    (paginationData.current_page + 1)
                }
                className={`cursor-pointer border px-3 py-1 rounded-md bg-blue-600 ${
                    paginationData.current_page === paginationData.last_page
                        ? "opacity-50 cursor-default"
                        : ""
                }`}
            >
                Next
            </Link>
        </div>
    );
}
