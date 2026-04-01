import { useState, useEffect, useCallback } from "react";
import api from "../api/api";

const useDataTable = ({ endpoint, initialPageSize = 10 }) => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0); // DataGrid is 0-based
    const [pageSize, setPageSize] = useState(initialPageSize); 
    const [rowCount, setRowCount] = useState(0); 
    const [sortModel, setSortModel] = useState([]);
    const [filters, setFilters] = useState({});

    const fetchData = useCallback(async () => {
        setLoading(true);

        try {
            const params = {
                page: page + 1, // backend is 1-based
                page_size: pageSize,
                ...filters
            };

            if (sortModel.length > 0) {
                const sort = sortModel[0];
                params.ordering = 
                    sort.sort === "asc"
                        ? sort.field
                        : `-${sort.field}`;
            }

            const res = await api.get(endpoint, { params });

            setRows(res.data.results);
            setRowCount(res.data.count);
        } catch (error) {
            console.error(`Failed to fetch data from ${endpoint}:`, error);
        } finally {
            setLoading(false);
        }
    }, [endpoint, page, pageSize, filters, sortModel]);

    // Fetch when dependencies change
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Reset page when filters or pageSize change
    useEffect(() => {
        setPage(0);
    }, [filters, pageSize, sortModel]);

    return {
        rows,
        loading,
        page,
        setPage,
        pageSize,
        setPageSize,
        rowCount,
        sortModel,
        setSortModel,
        filters,
        setFilters
    };
};

export default useDataTable;

