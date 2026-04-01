import { useState, useEffect, useCallback } from "react";

const useDataTable = ({ endpoint, initialPageSize = 10 }) => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0); // DataGrid is 0-based
    const [pageSize, setPageSize] = useState(initialPageSize); 
    const [rowCount, setRowCount] = useState(0); 
    const [sortModel, setSortModel] = useState([]);
    const [filters, setFilters] = useState({});

    const fetchData = useCallback (async () => {
        setLoading(true);
        try {
            const params = {
                page: page + 1, // backend is 1-based
                page_size: pageSize,
                ...filters
            };
};