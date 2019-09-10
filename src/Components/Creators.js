import React from "react";
import styled from "styled-components";

const Title = styled.div`
  width: 560px;
  padding: 10px 0;
  background-color: #141414;
  padding-left: 10px;
  margin-top: 10px;
`;

const CreatorsContainer = styled.div`
  width: 560px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid grey;
  background-color: rgba(0, 0, 0, 0.2);
`;

const CreatorsContainerInner = styled.span`
  width: 182px;
  display: inline-block;
  border: 1px solid grey;
  box-sizing: border-box;
`;

const CreatorName = styled.span`
  width: 180px;
  height: 15px;
  background-color: white;
  color: black;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
`;

const CreatorImage = styled.span`
  width: 180px;
  background-color: white;
  color: black;
  text-align: center;
  padding-top: 10px;
  display: inline-block;
  box-sizing: border-box;
`;

export default function Creators({ result: { created_by } }) {
  let creators = "";

  if (
    created_by === undefined ||
    created_by === null ||
    created_by.length === 0
  ) {
    creators = <Title>No creator information exists.</Title>;
  } else {
    creators = (
      <>
        <Title>Creators information</Title>
        <CreatorsContainer>
          {created_by.map(creator => (
            <CreatorsContainerInner key={creator.id}>
              <CreatorName key={creator.name}>{creator.name}</CreatorName>
              {creator.logo_path !== null ? (
                <CreatorImage key={creator.profile_path}>
                  <img
                    alt={creator.name}
                    width="180px"
                    height="200px"
                    src={`https://image.tmdb.org/t/p/original${creator.profile_path}`}
                  ></img>
                </CreatorImage>
              ) : (
                <CreatorImage>noImage</CreatorImage>
              )}
            </CreatorsContainerInner>
          ))}
        </CreatorsContainer>
      </>
    );
  }

  return <>{creators}</>;
}
