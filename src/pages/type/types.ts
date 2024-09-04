
export type TCountryName ={
  common: string;
  official:string
}

export type TFlags ={
  png: string;
  svg:string
}

export interface ICountry {
  name: TCountryName;
  flags: TFlags;
  population: number;
  capital: string[];
  region: string;
  currencies:Object,
  languages:Object,
  timezones:string[]
}

export interface ICountryCard{
  country:ICountry;
  onClick: () => void;
  selectedCountry:string | null;
}

export interface ICountryGridProps {
  countries: ICountry[];
  //onCountryClick: (country: ICountry) => void;
}

export interface ICountryFilters {
  order: 'asc' | 'desc';
  regionList: string[];
  sortCountries: (order: 'asc' | 'desc') => void;
  filterByRegion: (region: string) => void;
  searchCountry: (searchTerm:string) => void;
}