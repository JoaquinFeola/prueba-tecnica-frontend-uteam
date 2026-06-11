import { useCallback, useMemo, useState } from "react";

interface Props {
    rowsPerPage?: number;
    totalRegisters: number;
    pageIndex?: number;
}

export const usePaginationInMemory = ({
    rowsPerPage: receivedRowsPerPage = 10,
    pageIndex: receivedPageIndex = 0,
    totalRegisters = 0,
}: Props) => {
    const [rowsPerPage, setRowsPerPage] = useState(receivedRowsPerPage);
    const [pageIndex, setPageIndex] = useState(receivedPageIndex);

    const totalPages = useMemo(() => Math.ceil(totalRegisters / rowsPerPage), [totalRegisters, rowsPerPage]);

    const handleChangeRowsPerPage = (rowsPerPage: number) => setRowsPerPage(rowsPerPage);

    const handleNextPage = useCallback(() => {
        if (pageIndex >= totalPages - 1) return;

        setPageIndex(prev => prev + 1);
    }, [pageIndex, totalPages])

    const handlePreviousPage = useCallback(() => {
        if (pageIndex <= 0) return;

        setPageIndex(prev => prev - 1);
    }, [pageIndex, totalPages])

    const goToPage = (page: number) => {
        if ( page < 0 || page > totalPages) return;
        setPageIndex(page);
    }


    return {
        rowsPerPage,
        handleNextPage,
        totalPages,
        pageIndex,
        handlePreviousPage,
        handleChangeRowsPerPage,
        goToPage
    };
}
