import React from "react";
import styled from "styled-components";

const Title = styled.div`
  width: 560px;
  padding: 10px 0;
  background-color: #141414;
  padding-left: 10px;
  margin-top: 10px;
`;

const SeasonsContainer = styled.div`
  width: 560px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid grey;
  background-color: rgba(0, 0, 0, 0.2);
`;

const SeasonsContainerInner = styled.span`
  width: 182px;
  display: inline-block;
  border: 1px solid grey;
  box-sizing: border-box;
`;

const SeasonName = styled.span`
  width: 180px;
  height: 15px;
  background-color: white;
  color: black;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
`;

const SeasonImage = styled.span`
  width: 180px;
  background-color: white;
  color: black;
  text-align: center;
  padding-top: 10px;
  display: inline-block;
  box-sizing: border-box;
`;

export default function Seasons({ result: { seasons } }) {
  let result = "";

  if (seasons === undefined || seasons === null || seasons.length === 0) {
    result = <Title>No creator information exists.</Title>;
  } else {
    result = (
      <>
        <Title>Creators information</Title>
        <SeasonsContainer>
          {seasons.map(season => (
            <SeasonsContainerInner key={season.id}>
              <SeasonName key={season.name}>{season.name}</SeasonName>
              {season.logo_path !== null ? (
                <SeasonImage key={season.poster_path}>
                  <img
                    alt={season.name}
                    width="180px"
                    height="200px"
                    src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
                  ></img>
                </SeasonImage>
              ) : (
                <SeasonImage>noImage</SeasonImage>
              )}
            </SeasonsContainerInner>
          ))}
        </SeasonsContainer>
      </>
    );
  }

  return <>{result}</>;
}
