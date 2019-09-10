import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import { Link, withRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import Youtube from "Components/Youtube";
import Production from "Components/Production";
import Collections from "Components/Collections";
import Seasons from "Components/Seasons";
import Creators from "Components/Creators";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const TapContainer = styled.div`
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.5;
  width: 100%;
  margin-top: 15px;
`;

const Tap = styled.div`
  border: 2px solid white;
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.5;
  width: 80px;
  height: 30px;
  text-align: center;
  display: inline-block;
  background-color: ${props =>
    props.selected ? "rgba(255, 255, 128, 0.8)" : "rgba(255, 255, 128, 0.3)"};
`;

const DetailPresenter = ({
  result,
  loading,
  error,
  isMovie,
  id,
  location: { pathname }
}) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime
                ? result.runtime
                  ? result.runtime
                  : result.episode_run_time[0]
                : "?"}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <TapContainer>
            {isMovie ? (
              <>
                <Link to={`/movie/${id}/youtube`}>
                  <Tap selected={pathname === `/movie/${id}/youtube`}>
                    Youtube
                  </Tap>
                </Link>
                <Link to={`/movie/${id}/production`}>
                  <Tap selected={pathname === `/movie/${id}/production`}>
                    Production
                  </Tap>
                </Link>
                <Link to={`/movie/${id}/collections`}>
                  <Tap selected={pathname === `/movie/${id}/collections`}>
                    Collections
                  </Tap>
                </Link>
              </>
            ) : (
              <>
                <Link to={`/show/${id}/youtube`}>
                  <Tap selected={pathname === `/show/${id}/youtube`}>
                    Youtube
                  </Tap>
                </Link>
                <Link to={`/show/${id}/seasons`}>
                  <Tap selected={pathname === `/show/${id}/seasons`}>
                    Seasons
                  </Tap>
                </Link>
                <Link to={`/show/${id}/production`}>
                  <Tap selected={pathname === `/show/${id}/production`}>
                    Production
                  </Tap>
                </Link>
                <Link to={`/show/${id}/creators`}>
                  <Tap selected={pathname === `/show/${id}/creators`}>
                    Creators
                  </Tap>
                </Link>
              </>
            )}
          </TapContainer>
          <Route
            path={`/movie/:id/youtube`}
            render={() => <Youtube result={result} />}
          />
          <Route
            path={`/movie/:id/production`}
            render={() => <Production result={result} />}
          />
          <Route
            path={`/movie/:id/collections`}
            render={() => <Collections result={result} />}
          />
          <Route
            path={`/show/:id/youtube`}
            render={() => <Youtube id={id} isTv />}
          />
          <Route
            path={`/show/:id/seasons`}
            render={() => <Seasons result={result} />}
          />
          <Route
            path={`/show/:id/production`}
            render={() => <Production result={result} />}
          />
          <Route
            path={`/show/:id/creators`}
            render={() => <Creators result={result} />}
          />
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default withRouter(DetailPresenter);
