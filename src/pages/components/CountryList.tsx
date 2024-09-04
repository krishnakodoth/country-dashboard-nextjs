import React, { useState } from "react";
import CountryGrid from "./CountryGrid";
import { useFetch } from "../hooks/useFetch";
import { AbsoluteLoader } from "@/styles/StyledComponents";
import Loader from "./Loader";
import styles from "@/styles/Home.module.css";

const CountryList = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_COUNTRY || "";
  const { data, loading, error } = useFetch(apiUrl);
  return (
    <div className={`${styles.wrapper}`}>
      {loading && (
        <AbsoluteLoader>
          <Loader />
        </AbsoluteLoader>
      )}
      {!loading && data && data.length > 0 && (
        <>
          <CountryGrid
            countries={data}
          />
          {/* {selectedCountry && (
              <p>Test</p>
              // <DetailedView
              //   country={selectedCountry}
              //   onClose={() => setSelectedCountry(null)}
              // />
            )} */}
        </>
      )}
    </div>
  );
};

export default CountryList;
