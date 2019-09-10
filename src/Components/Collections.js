import React from "react";
import styled from "styled-components";

const Title = styled.div`
  width: 560px;
  padding: 10px 0;
  background-color: #141414;
  padding-left: 10px;
  margin-top: 10px;
`;

const CollectionImage = styled.span`
  background-color: white;
  color: black;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
`;

const CollectionContainer = styled.div`
  width: 560px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid grey;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default function Collections({ result: { belongs_to_collection } }) {
  if (belongs_to_collection === null || belongs_to_collection.length === 0) {
    return <Title>No collection information exists.</Title>;
  } else {
    return (
      <>
        <Title>{belongs_to_collection.name}</Title>
        <CollectionContainer>
          <CollectionImage>
            <img
              alt={belongs_to_collection.name}
              width="558px"
              src={`https://image.tmdb.org/t/p/original${belongs_to_collection.poster_path}`}
            ></img>
          </CollectionImage>
        </CollectionContainer>
      </>
    );
  }
}
