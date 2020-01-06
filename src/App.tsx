import React, { useContext } from "react";
import {
  Toolbar,
  Container,
  Typography,
  CssBaseline,
  AppBar,
  Grid
} from "@material-ui/core";

import "./App.css";

import { Tile, HighlightTile, UpgradeTile } from "./Tile";
import { StoreProvider, Store } from "./store/store";
import { tilesData } from "./data";

const Tiles: React.FC = () => {
  const { state } = useContext(Store);
  const tiles = [];

  for (let loc in state.map.tiles) {
    tiles.push(<Tile key={loc} loc={loc} tile={state.map.tiles[loc]}/>);
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

  for(const i in upgrades) {
    const upgrade = upgrades[i];
    tiles.push(<UpgradeTile key={upgrade} loc={`${i},0`} tile={{rotation: tile.rotation, type: upgrade}}/>);
  }

  return <svg width="100%" height="500px" viewBox="-2.0 0.0 2 2">{tiles}</svg>;
};

const Board: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <svg width="100%" viewBox="-0.9 -10.0 17.65 17.65">
          {/* <image
  href="./map.jpg"
  x="-1.64"
  y="-8.87"
  width="100%"
/> */}
          <Tiles />
        </svg>
      </Grid>
      <Grid item xs={1}>
        <TileSelection />
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            Player Data
          </Grid>
          <Grid item xs={12}>
            Company Data
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <div className="App">
        <React.Fragment>
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
        </React.Fragment>
      </div>
    </StoreProvider>
  );
};

export default App;
