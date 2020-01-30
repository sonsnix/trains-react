interface Resolvers {
  [key: string]: {
    [field: string]: (
      rootValue?: any,
      args?: any,
      context?: any,
      info?: any,
    ) => any;
  };
}

export type TileType = {
  type: string;
  rotation: number;
};

export const localResolvers: Resolvers = {

};

export function initialState(): any {
  return {
    data: { ui: { __typename: "UserInterface", selectedLoc: "2,2" } },
  };
}
