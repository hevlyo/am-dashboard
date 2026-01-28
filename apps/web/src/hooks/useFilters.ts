import { useState, useCallback, useEffect } from "react";
import type { Filters } from "@repo/schemas";

const initialFilters: Filters = {
  dateFrom: undefined,
  dateTo: undefined,
  categories: [],
  status: [],
  search: "",
};

const storageKey = "dashboardFilters";

export function useFilters() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Filters;
        setFilters(parsed);
        setAppliedFilters(parsed);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAppliedFilters(filters);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters]);

  const updateFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const applyFilters = useCallback(() => {
    setAppliedFilters(filters);
  }, [filters]);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    localStorage.removeItem(storageKey);
  }, []);

  return {
    filters,
    appliedFilters,
    updateFilter,
    applyFilters,
    clearFilters,
  };
}
