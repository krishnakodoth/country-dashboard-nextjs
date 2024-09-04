// components/CountryCard.tsx
import React, { useState } from "react";
import { ICountry, ICountryCard } from "../type/types";
import Image from "next/image";
import { Card, CardDetails, CardWrapper, Content, FlagWrapper, Subtitle, Title } from "@/styles/StyledComponents";



const CountryCard: React.FC<ICountryCard> = ({
  country,
  selectedCountry,
  onClick
}: ICountryCard) => {

  /** getCurrencyNames */
  const getCurrencyNames = (currencies:Object) => {
    if(currencies === undefined) return '';
    const names = Object.values(currencies).map(currency => currency.name);
    return names.join(", ");
  }

  return (
    <CardWrapper>
      <Card onClick={onClick}>
        <FlagWrapper>
          <Image
            src={`${country.flags.png}`}
            alt={`Flag of ${country.name.common}`}
            width={250}
            height={150}
          />
        </FlagWrapper>
        <Content>
          <Title>{country.name.common}</Title>
          <Subtitle>
            Capital:{" "}
            {country.capital && Array.isArray(country.capital)
              ? country.capital.join("|")
              : country.capital}
          </Subtitle>
          <Subtitle>Population: {country.population}</Subtitle>
          <Subtitle>Region: {country.region}</Subtitle>
        </Content>
      </Card>
      <CardDetails
        onClick={onClick} 
        active={(selectedCountry?.toString().toLocaleLowerCase() === country?.name?.common.toLocaleLowerCase()) ? "true" : "false"}>
        <Content>
          <Image
              src={`${country.flags.png}`}
              alt={`Flag of ${country.name.common}`}
              width={250}
              height={100}
            />
          <Title>{country.name.common}</Title>
          <Subtitle>
            Currencies : {getCurrencyNames(country.currencies)}            
          </Subtitle>
          <Subtitle>languages: {(country?.languages) ? Object.values(country?.languages).join(', '): ''}</Subtitle>
          <Subtitle>Timezones: {(country?.timezones) ? Object.values(country?.timezones).join(', '): ''}</Subtitle>
        </Content>
      </CardDetails>
    </CardWrapper>
  );
};

export default CountryCard;
