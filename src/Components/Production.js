import React from "react";
import styled from "styled-components";

const Title = styled.div`
  width: 560px;
  padding: 10px 0;
  background-color: #141414;
  padding-left: 10px;
  margin-top: 10px;
`;

const CompanyContainer = styled.div`
  width: 560px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid grey;
  background-color: rgba(0, 0, 0, 0.2);
`;

const CompanyContainerInner = styled.span`
  width: 182px;
  display: inline-block;
  border: 1px solid grey;
  box-sizing: border-box;
`;

const CompanyName = styled.span`
  width: 180px;
  height: 15px;
  background-color: white;
  color: black;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
`;

const CompanyImage = styled.span`
  width: 180px;
  height: 100px;
  background-color: white;
  color: black;
  text-align: center;
  line-height: 80px;
  padding: 10px;
  display: inline-block;
  box-sizing: border-box;
`;

const CountryContainer = styled.div`
  width: 560px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid grey;
  background-color: rgba(0, 0, 0, 0.2);
`;

const CountryName = styled.span`
  width: 160px;
  height: 30px;
  line-height: 30px;
  background-color: white;
  color: black;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid grey;
`;

export default function Production({
  result: { production_companies, production_countries }
}) {
  let companies = "";
  let countries = "";

  if (
    production_companies === undefined ||
    production_companies === null ||
    production_companies.length === 0
  ) {
    companies = <Title>No company information exists.</Title>;
  } else {
    companies = (
      <>
        <Title>Company information</Title>
        <CompanyContainer>
          {production_companies.map(company => (
            <CompanyContainerInner key={company.id}>
              <CompanyName key={company.name}>{company.name}</CompanyName>
              {company.logo_path !== null ? (
                <CompanyImage key={company.logo_path}>
                  <img
                    alt={company.name}
                    width="160px"
                    height="80px"
                    src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                  ></img>
                </CompanyImage>
              ) : (
                <CompanyImage>noImage</CompanyImage>
              )}
            </CompanyContainerInner>
          ))}
        </CompanyContainer>
      </>
    );
  }

  if (
    production_countries === undefined ||
    production_countries === null ||
    production_countries.length === 0
  ) {
    countries = <Title>No country information exists.</Title>;
  } else {
    countries = (
      <>
        <Title>Country information</Title>
        <CountryContainer>
          {production_countries.map(country => (
            <CountryName key={country.name}>{country.name}</CountryName>
          ))}
        </CountryContainer>
      </>
    );
  }

  return (
    <>
      {companies}
      {countries}
    </>
  );
}
