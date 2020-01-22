import React, { useReducer } from "react";

import { tilesInitialState } from "../data";

export { Store, StoreProvider };

export type TileType = {
  type: string;
  rotation: number;
};


type GameState = {
  [key: string]: any;
  map: { tiles: { [key: string]: TileType } };
  companies: {};
  players: {};
  game: { curCompany: string; phase: string };
  ui: { selectedLoc?: string };
};

type ActionType = {
  type: string;
  payload: any;
};

interface IContextProps {
  state: GameState;
  dispatch: any;
}

const initialState: GameState = {
  map: { tiles: tilesInitialState },
  game: { curCompany: "sanuki", phase: "track" },
  companies: { sanuki: {} },
  players: { Markus: { cash: 200 } },
  ui: { selectedLoc: undefined }
};
const Store = React.createContext({} as IContextProps);

function reducer(state: GameState, action: ActionType) {
  console.log(action);
  let newState: GameState;

  switch (action.type) {
    case "SELECT_TILE":
      newState = { ...state };
      newState.ui.selectedLoc = action.payload;
      return newState;
    case "SELECT_UPGRADE":
      newState = { ...state };
      newState.map.tiles[state.ui.selectedLoc!].type = action.payload;
      return newState;
    default:
      throw new Error();
  }
}

const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
