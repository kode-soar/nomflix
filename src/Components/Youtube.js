import React, { useState, useEffect, Fragment } from "react";
import { tvApi } from "../api";
import Loader from "./Loader";
import styled from "styled-components";

const Title = styled.div`
  width: 560px;
  padding: 10px 0;
  background-color: #141414;
  padding-left: 10px;
  margin-top: 10px;
`;

const Margin = styled.div`
  width: 100%;
  height: 50px;
`;

export default function Youtube(props) {
  let id = props.id;
  let isTv = props.isTv;
  let isTvValidation = isTv === undefined ? props.result.videos.results : [];
  const [results, setYoutubes] = useState(isTvValidation);
  const [loading, setLoading] = useState(false);

  if (isTv) {
    async function getData(id) {
      try {
        setLoading(true);
        const {
          data: { results }
        } = await tvApi.youtube(id);
        setYoutubes(results);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    useEffect(() => {
      getData(id);
    }, []);
  }

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  } else if (results.length === 0) {
    return <Title>No youtube video exists.</Title>;
  } else {
    return (
      <>
        {results.map(youtube => (
          <Fragment key={youtube.key}>
            <Title key={youtube.name}>{youtube.name}</Title>
            <iframe
              key={youtube.id}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${youtube.key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={youtube.name}
            ></iframe>
          </Fragment>
        ))}
        <Margin></Margin>
      </>
    );
  }
}
