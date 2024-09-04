//@ts-uncheck
// components/CountryGrid.tsx

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CountryCard from "./CountryCard";
import { useLazyLoading } from "../hooks/useLazyLoading";
import { ICountry, ICountryGridProps } from "../type/types";
import Loader from "./Loader";
import CountryFilters from "./CountryFilters";
import { AbsoluteLoader,CountryGridList, LoadeWrapper } from "@/styles/StyledComponents";

const itemPerPage: number = Number(process.env.NEXT_PUBLIC_API_PER_PAGE) || 15;

const CountryGrid = ({countries}:ICountryGridProps) => {
  const [sortedCountries, setSortedCountries] = useState([...countries]);
  const [regionList, setRegionList] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [region, setRegion] = useState<string>("");
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountry|null>(null);
  
  const {
    loading,
    getSortedCountries,
    getCountyRegionsList,
    getCounttyFilteredByRegion,
    searchCountriesByNameOrCapital,
    visibleItems,
    updateVisibleItems,
    loadMore,
    hasMore,
  } = useLazyLoading(sortedCountries, itemPerPage);
  const loaderRef = useRef<HTMLDivElement>(null);

  /** On component load */
  // useEffect(() => {
  //   console.log("visibleItems",visibleItems)
  //   setCountryList(()=>visibleItems);
  // }, [visibleItems]);

  /** On country change load */
  useEffect(() => {
    const __regionlList = getCountyRegionsList(countries);
    setRegionList(__regionlList);
  }, [countries]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (loaderRef.current && hasMore) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore]);

  /** handleObserver */
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadMore();
    }
  };

  /** sortCountries */
  const sortCountries = (order: "asc" | "desc") => {
    setSortOrder(order);
    setIsFilterLoading(true);
    setSortedCountries(()=>[]);
    const sorted = getSortedCountries(order,[...sortedCountries]);
    setSortedCountries(()=>sorted);
    updateVisibleItems(sorted)
    setIsFilterLoading(false);    
  };

  /** filter by Region */
  const filterByRegion = (region: string) => {
    setRegion(region);
    // On region change filter the original countries
    const filtered = getCounttyFilteredByRegion(region,[...countries]);
    setSortedCountries(()=>filtered);
    updateVisibleItems(filtered)
  };

  /** handleSearchChange */
  const handleSearchChange = (searchTerm:string) => {
    const filtered = searchCountriesByNameOrCapital(searchTerm,[...countries]);
    setSortedCountries(()=>filtered);
    updateVisibleItems(filtered)
  }

  

  /** onCountryClick */
  const onCountryClick = (country:ICountry) => {
    // Check the selected country for reset handling
    if(selectedCountry && selectedCountry.name.common === country.name.common){
      setSelectedCountry(null)
    }
    else{
      setSelectedCountry(country)
    }
    
  };
  return (
    <>
      <CountryFilters 
        regionList={regionList} 
        order={sortOrder} 
        sortCountries={sortCountries} 
        filterByRegion={filterByRegion}
        searchCountry={handleSearchChange} />
      {isFilterLoading && (
        <AbsoluteLoader>
          <Loader />
        </AbsoluteLoader>
      )}
      {visibleItems.length > 0 && (
        <>
          <CountryGridList>
            {visibleItems.map((country) => (
              <CountryCard
                key={country.name.common}
                country={country}
                selectedCountry={selectedCountry ? selectedCountry.name.common : ""}
                onClick={() => onCountryClick(country)}
              />
            ))}

            <div ref={loaderRef} />
          </CountryGridList>
          {loading && (
            <LoadeWrapper>
              <Loader />
            </LoadeWrapper>
          )}
        </>
      )}
    </>
  );
};

export default CountryGrid;
