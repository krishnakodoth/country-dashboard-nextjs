import React, { useState, useEffect } from "react";
import { ICountry } from "../type/types";

export const useLazyLoading = (items: any[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const delay = 1000; // This can be configured

  useEffect(() => {
    const loadMoreItems = () => {
      setLoading(true);
      setTimeout(() => {
        const newItems = items.slice(0, currentPage * itemsPerPage);
        setVisibleItems(newItems);
        setLoading(false);
        // Check if all items have been loaded
        if (newItems.length >= items.length) {
          setHasMore(false);
        }
      }, delay);
    };

    if (hasMore) {
      loadMoreItems();
    }
  }, [currentPage, items, itemsPerPage, hasMore]);

  /**updateVisibleItems */
  const updateVisibleItems = (items: any[]) => {
    const newItems = items.slice(0, currentPage * itemsPerPage);
    setVisibleItems(newItems);
  }
  /** getSortedCountries */
  const getSortedCountries = (order: 'asc' | 'desc',countries:ICountry[]) => {
    const sorted = [...countries].sort((a, b) => {
      if (order === 'asc') {
        return a.population - b.population;
      } else {
        return b.population - a.population;
      }
    });
    return sorted;
  };

  /** getCountyRegionsList */
  const getCountyRegionsList = (countries: ICountry[]): string[] => {
    const regions = countries.map((country) => country.region);
    return Array.from(new Set(regions));
  };

  /** getCounttyFilteredByRegion */
  const getCounttyFilteredByRegion = (region: string, countries: ICountry[]) => {
    console.log(region,countries)
    let filtered = [...countries];
    if (region !== "") {
      filtered = [...countries].filter((country) => country.region === region);
    }
    return filtered;
  }

  /** loadMore */
  const searchCountriesByNameOrCapital = (searchTerm: string, countries: ICountry[]) => {
    // Convert searchTerm to lowercase for case-insensitive comparison
    const lowercasedTerm = searchTerm.toLowerCase();
    let searchOuput = [...countries];
    if (searchTerm !== "") {
      searchOuput = [...countries].filter((country) => {
        const capital = (country.capital && country.capital.length > 0 && Array.isArray(country.capital)) ? country.capital.join(',').toLowerCase() : '';
        return country.name.common.toLowerCase().includes(lowercasedTerm) || capital.includes(lowercasedTerm);
      });
    }
    return searchOuput;
  };

  return {
    loading,
    hasMore,
    visibleItems,
    updateVisibleItems,
    getSortedCountries,
    getCountyRegionsList,
    getCounttyFilteredByRegion,
    searchCountriesByNameOrCapital,
    loadMore: () => setCurrentPage((prev) => prev + 1),
  };
};
