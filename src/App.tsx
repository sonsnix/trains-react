/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import { Toolbar, Container, Typography, CssBaseline, AppBar, Grid, Paper, CardHeader } from "@material-ui/core";

import { ApolloClient } from 'apollo-client';

import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import "./App.css";

import { Tile, HighlightTile, UpgradeTile } from "./components/Tile";
import { StoreProvider, Store } from "./store/store";
import { tilesData } from "./data";

import { PlayerDisplay } from "./components/PlayerDisplay";
import { CompanyDisplay } from "./components/CompanyDisplay";
import { StockMarketDisplay } from "./components/StockMarketDisplay";


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    credentials: 'include',
    uri: "http://localhost:4000/graphql",
  }),
});

const Tiles: React.FC = () => {
  const { state } = useContext(Store);
  const tiles = [];

  for (let loc in state.map.tiles) {
    tiles.push(<Tile key={loc} loc={loc} tile={state.map.tiles[loc]} />);
  }

  if (state.ui.selectedLoc !== undefined) {
    tiles.push(<HighlightTile key="highlight" loc={state.ui.selectedLoc} />);
  }
  return <g>{tiles}</g>;
};

const TileSelection: React.FC = () => {
  const { state } = useContext(Store);

  if (state.ui.selectedLoc === undefined) {
    return <></>;
  }

  const tile = state.map.tiles[state.ui.selectedLoc];
  const upgrades = tilesData[tile.type].upgrades;
  const tiles: React.ReactElement[] = [];

  for (const i in upgrades) {
    const upgrade = upgrades[i];
    tiles.push(<UpgradeTile key={upgrade} loc={`${i},0`} tile={{ rotation: tile.rotation, type: upgrade }} />);
  }

  return (
    <svg width="100%" height="500px" viewBox="-2.0 0.0 2 2">
      {tiles}
    </svg>
  );
};

const Board: React.FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <svg width="100%" viewBox="-0.9 -9.0 17.65 17.65">
          <image href="./map.jpg" x="-1.64" y="-8.87" width="100%" />
          <Tiles />
        </svg>
        <StockMarketDisplay />
      </Grid>
      <Grid item xs={1}>
        <TileSelection />
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PlayerDisplay />
          </Grid>
          <Grid item xs={12}>
            <CompanyDisplay />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <div className="App">
          <CssBaseline />
          <header>
            <AppBar position="relative">
              <Toolbar>
                <Typography variant="h6">Trains</Typography>
              </Toolbar>
            </AppBar>
          </header>
          <main>
            <Container fixed>
              <Board />
            </Container>
          </main>
        </div>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
