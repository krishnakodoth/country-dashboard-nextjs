import styled from "styled-components";


/** Country Grid */
export const CountryGridList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  padding: 16px;
`;

export const LoadeWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
`;

/** Absolute loader */
export const AbsoluteLoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

/** Filter Component */

export const FilterWrapper = styled.div`
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: end;
  box-shadow: 0px 7px 9px 0px #01010138;
`;

export const SortButton = styled.button<{ active: string }>`
  margin: 10px;
  padding: 10px 15px;
  background-color: ${(props) =>
    props.active === "true" ? "#2980b9" : "#3498db"};
  color: ${(props) => (props.active === "true" ? "#fff" : "#eee")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: ${(props) => (props.active === "true" ? "bold" : "normal")};

  &:hover {
    background-color: #2980b9;
  }
`;

export const Filter = styled.div`
  border: 1px solid #2980b9;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 0 10px;

  label {
    padding: 10px;
    color: #333;
  } 
  select {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  input {
    width: 400px;
    border: 1px solid #3498db;
    padding: 12px 10px;
    border-radius: 5px;

    &:hover {
      border: 1px solid #2980b9;
    }
    &:focus {
      border: 1px solid #2980b9;
      box-shadow: 0 0 5px rgba(41, 128, 185, 0.5);
    }
    &:active {
      border-color: #2980b9;
      background-color: #f0f8ff;
    }
  }
`;

/**  Country Card */
export const CardWrapper = styled.div`
    position: relative;
`
export const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const FlagWrapper = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  img {
    width: 100% !important;
    height: 150px !important;
    display: block;
    object-fit: cover;
  }
`;
export const Content = styled.div`
  padding: 16px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

export const Subtitle = styled.p`
  margin: 8px 0;
  font-size: 0.875rem;
`;

export const CardDetails = styled.div<{ active: string }>`
  position: absolute;
  inset: 0;
  background-color: #fff;
  border-radius: 8px;
  display: ${(props) =>
    props.active === "true" ? "block" : "none"};
`;
