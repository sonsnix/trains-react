import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Company = {
   __typename?: 'Company',
  cash: Scalars['Float'],
  id: Scalars['String'],
  fullName: Scalars['String'],
  trains: Array<Scalars['String']>,
  floated: Scalars['Boolean'],
  parValue?: Maybe<Scalars['Float']>,
  stockPosition?: Maybe<StockPosition>,
  initialOffer: Scalars['Float'],
  market: Scalars['Float'],
  stockValue?: Maybe<Scalars['Int']>,
};

export type Game = {
   __typename?: 'Game',
  id: Scalars['String'],
  name: Scalars['String'],
  states: Array<GameState>,
  players?: Maybe<Array<User>>,
  state: GameState,
};

export type GameState = {
   __typename?: 'GameState',
  status: Status,
  companies: Array<Company>,
  players: Array<Player>,
  tiles: Array<Tile>,
};

export type Mutation = {
   __typename?: 'Mutation',
  authorizeWithGithub: Scalars['String'],
  login?: Maybe<Scalars['Boolean']>,
  selectMapTile?: Maybe<Scalars['Boolean']>,
  submitCompanyTurn: Scalars['String'],
  submitStockTurn?: Maybe<GameState>,
};


export type MutationAuthorizeWithGithubArgs = {
  code: Scalars['String']
};


export type MutationSelectMapTileArgs = {
  loc?: Maybe<Scalars['String']>
};


export type MutationSubmitStockTurnArgs = {
  args: StockTurnArgs
};

export type Player = {
   __typename?: 'Player',
  id: Scalars['String'],
  cash: Scalars['Float'],
  shares: Array<Share>,
  passed: Scalars['Boolean'],
};

export type Query = {
   __typename?: 'Query',
  getGame?: Maybe<Game>,
  getGames?: Maybe<Array<Game>>,
  getUser?: Maybe<User>,
  getUsers?: Maybe<Array<User>>,
  githubLoginUrl: Scalars['String'],
  me?: Maybe<User>,
  ui: UserInterface,
};


export type QueryGetGameArgs = {
  gameId: Scalars['String']
};


export type QueryGetUserArgs = {
  userId: Scalars['String']
};

export type Share = {
   __typename?: 'Share',
  id: Scalars['String'],
  amount: Scalars['Float'],
};

export type Status = {
   __typename?: 'Status',
  curCompany: Scalars['String'],
  curPhase: Scalars['String'],
  curPriority: Scalars['Float'],
  playerOrder: Array<Scalars['Float']>,
  curTrainPhase: Scalars['Float'],
};

export type StockOrder = {
  type: StockOrderType,
  companyId: Scalars['String'],
  amount: Scalars['Float'],
  value?: Maybe<Scalars['Float']>,
};

export enum StockOrderType {
  BuyInitial = 'BUY_INITIAL',
  BuyMarket = 'BUY_MARKET',
  Sell = 'SELL'
}

export type StockPosition = {
   __typename?: 'StockPosition',
  row: Scalars['Int'],
  col: Scalars['Int'],
  z: Scalars['Int'],
};

export type StockTurnArgs = {
  orders?: Maybe<Array<StockOrder>>,
  gameId: Scalars['String'],
};

export type Tile = {
   __typename?: 'Tile',
  id: Scalars['String'],
  type: Scalars['String'],
  rotation: Scalars['Float'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['String'],
  name: Scalars['String'],
  games?: Maybe<Array<Game>>,
};

export type UserInterface = {
   __typename?: 'UserInterface',
  selectedLoc?: Maybe<Scalars['String']>,
};

export type MapFragment = (
  { __typename?: 'GameState' }
  & { tiles: Array<(
    { __typename?: 'Tile' }
    & Pick<Tile, 'id' | 'type' | 'rotation'>
  )> }
);

export type StatusFragment = (
  { __typename?: 'GameState' }
  & { status: (
    { __typename?: 'Status' }
    & Pick<Status, 'curCompany' | 'curPhase' | 'curPriority' | 'playerOrder' | 'curTrainPhase'>
  ) }
);

export type LocalFragment = (
  { __typename?: 'Query' }
  & { ui: (
    { __typename?: 'UserInterface' }
    & Pick<UserInterface, 'selectedLoc'>
  ) }
);

export type SelectedLocQueryVariables = {};


export type SelectedLocQuery = (
  { __typename?: 'Query' }
  & { ui: (
    { __typename?: 'UserInterface' }
    & Pick<UserInterface, 'selectedLoc'>
  ) }
);

export type PlayersAndCompaniesFragment = (
  { __typename?: 'GameState' }
  & { companies: Array<(
    { __typename?: 'Company' }
    & Pick<Company, 'id' | 'cash' | 'trains' | 'initialOffer' | 'market' | 'floated' | 'parValue' | 'stockValue' | 'fullName'>
    & { stockPosition: Maybe<(
      { __typename?: 'StockPosition' }
      & Pick<StockPosition, 'row' | 'col' | 'z'>
    )> }
  )>, players: Array<(
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'cash' | 'passed'>
    & { shares: Array<(
      { __typename?: 'Share' }
      & Pick<Share, 'id' | 'amount'>
    )> }
  )> }
);

export type MapQueryVariables = {};


export type MapQuery = (
  { __typename?: 'Query' }
  & { getGames: Maybe<Array<(
    { __typename?: 'Game' }
    & { state: (
      { __typename?: 'GameState' }
      & MapFragment
      & StatusFragment
    ) }
  )>>, ui: (
    { __typename?: 'UserInterface' }
    & Pick<UserInterface, 'selectedLoc'>
  ) }
);

export type PlayersCompaniesQueryVariables = {};


export type PlayersCompaniesQuery = (
  { __typename?: 'Query' }
  & { getGames: Maybe<Array<(
    { __typename?: 'Game' }
    & { state: (
      { __typename?: 'GameState' }
      & PlayersAndCompaniesFragment
    ) }
  )>> }
);

export type CompaniesQueryVariables = {};


export type CompaniesQuery = (
  { __typename?: 'Query' }
  & { getGames: Maybe<Array<(
    { __typename?: 'Game' }
    & { state: (
      { __typename?: 'GameState' }
      & { companies: Array<(
        { __typename?: 'Company' }
        & Pick<Company, 'id' | 'cash' | 'trains' | 'initialOffer' | 'market' | 'floated' | 'parValue' | 'stockValue' | 'fullName'>
        & { stockPosition: Maybe<(
          { __typename?: 'StockPosition' }
          & Pick<StockPosition, 'row' | 'col' | 'z'>
        )> }
      )> }
    ) }
  )>> }
);

export type PlayersQueryVariables = {};


export type PlayersQuery = (
  { __typename?: 'Query' }
  & { getGames: Maybe<Array<(
    { __typename?: 'Game' }
    & { state: (
      { __typename?: 'GameState' }
      & { players: Array<(
        { __typename?: 'Player' }
        & Pick<Player, 'id' | 'cash'>
        & { shares: Array<(
          { __typename?: 'Share' }
          & Pick<Share, 'id' | 'amount'>
        )> }
      )> }
    ) }
  )>> }
);

export type LoginMutationVariables = {};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type SubmitStockTurnMutationVariables = {
  args: StockTurnArgs
};


export type SubmitStockTurnMutation = (
  { __typename?: 'Mutation' }
  & { submitStockTurn: Maybe<(
    { __typename?: 'GameState' }
    & PlayersAndCompaniesFragment
  )> }
);

export const MapFragmentDoc = gql`
    fragment Map on GameState {
  tiles {
    id
    type
    rotation
  }
}
    `;
export const StatusFragmentDoc = gql`
    fragment Status on GameState {
  status {
    curCompany
    curPhase
    curPriority
    playerOrder
    curTrainPhase
  }
}
    `;
export const LocalFragmentDoc = gql`
    fragment Local on Query {
  ui {
    selectedLoc
  }
}
    `;
export const PlayersAndCompaniesFragmentDoc = gql`
    fragment PlayersAndCompanies on GameState {
  companies {
    id
    cash
    trains
    initialOffer
    market
    floated
    parValue
    stockValue
    fullName
    stockPosition {
      row
      col
      z
    }
  }
  players {
    id
    cash
    shares {
      id
      amount
    }
    passed
  }
}
    `;
export const SelectedLocDocument = gql`
    query SelectedLoc {
  ui {
    selectedLoc
  }
}
    `;
export type SelectedLocComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SelectedLocQuery, SelectedLocQueryVariables>, 'query'>;

    export const SelectedLocComponent = (props: SelectedLocComponentProps) => (
      <ApolloReactComponents.Query<SelectedLocQuery, SelectedLocQueryVariables> query={SelectedLocDocument} {...props} />
    );
    
export type SelectedLocProps<TChildProps = {}> = ApolloReactHoc.DataProps<SelectedLocQuery, SelectedLocQueryVariables> & TChildProps;
export function withSelectedLoc<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SelectedLocQuery,
  SelectedLocQueryVariables,
  SelectedLocProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, SelectedLocQuery, SelectedLocQueryVariables, SelectedLocProps<TChildProps>>(SelectedLocDocument, {
      alias: 'selectedLoc',
      ...operationOptions
    });
};

/**
 * __useSelectedLocQuery__
 *
 * To run a query within a React component, call `useSelectedLocQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectedLocQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectedLocQuery({
 *   variables: {
 *   },
 * });
 */
export function useSelectedLocQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SelectedLocQuery, SelectedLocQueryVariables>) {
        return ApolloReactHooks.useQuery<SelectedLocQuery, SelectedLocQueryVariables>(SelectedLocDocument, baseOptions);
      }
export function useSelectedLocLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SelectedLocQuery, SelectedLocQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SelectedLocQuery, SelectedLocQueryVariables>(SelectedLocDocument, baseOptions);
        }
export type SelectedLocQueryHookResult = ReturnType<typeof useSelectedLocQuery>;
export type SelectedLocLazyQueryHookResult = ReturnType<typeof useSelectedLocLazyQuery>;
export type SelectedLocQueryResult = ApolloReactCommon.QueryResult<SelectedLocQuery, SelectedLocQueryVariables>;
export const MapDocument = gql`
    query Map {
  getGames {
    state {
      ...Map
      ...Status
    }
  }
  ui @client {
    selectedLoc
  }
}
    ${MapFragmentDoc}
${StatusFragmentDoc}`;
export type MapComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MapQuery, MapQueryVariables>, 'query'>;

    export const MapComponent = (props: MapComponentProps) => (
      <ApolloReactComponents.Query<MapQuery, MapQueryVariables> query={MapDocument} {...props} />
    );
    
export type MapProps<TChildProps = {}> = ApolloReactHoc.DataProps<MapQuery, MapQueryVariables> & TChildProps;
export function withMap<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MapQuery,
  MapQueryVariables,
  MapProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MapQuery, MapQueryVariables, MapProps<TChildProps>>(MapDocument, {
      alias: 'map',
      ...operationOptions
    });
};

/**
 * __useMapQuery__
 *
 * To run a query within a React component, call `useMapQuery` and pass it any options that fit your needs.
 * When your component renders, `useMapQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMapQuery({
 *   variables: {
 *   },
 * });
 */
export function useMapQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MapQuery, MapQueryVariables>) {
        return ApolloReactHooks.useQuery<MapQuery, MapQueryVariables>(MapDocument, baseOptions);
      }
export function useMapLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MapQuery, MapQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MapQuery, MapQueryVariables>(MapDocument, baseOptions);
        }
export type MapQueryHookResult = ReturnType<typeof useMapQuery>;
export type MapLazyQueryHookResult = ReturnType<typeof useMapLazyQuery>;
export type MapQueryResult = ApolloReactCommon.QueryResult<MapQuery, MapQueryVariables>;
export const PlayersCompaniesDocument = gql`
    query PlayersCompanies {
  getGames {
    state {
      ...PlayersAndCompanies
    }
  }
}
    ${PlayersAndCompaniesFragmentDoc}`;
export type PlayersCompaniesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PlayersCompaniesQuery, PlayersCompaniesQueryVariables>, 'query'>;

    export const PlayersCompaniesComponent = (props: PlayersCompaniesComponentProps) => (
      <ApolloReactComponents.Query<PlayersCompaniesQuery, PlayersCompaniesQueryVariables> query={PlayersCompaniesDocument} {...props} />
    );
    
export type PlayersCompaniesProps<TChildProps = {}> = ApolloReactHoc.DataProps<PlayersCompaniesQuery, PlayersCompaniesQueryVariables> & TChildProps;
export function withPlayersCompanies<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PlayersCompaniesQuery,
  PlayersCompaniesQueryVariables,
  PlayersCompaniesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, PlayersCompaniesQuery, PlayersCompaniesQueryVariables, PlayersCompaniesProps<TChildProps>>(PlayersCompaniesDocument, {
      alias: 'playersCompanies',
      ...operationOptions
    });
};

/**
 * __usePlayersCompaniesQuery__
 *
 * To run a query within a React component, call `usePlayersCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayersCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayersCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlayersCompaniesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlayersCompaniesQuery, PlayersCompaniesQueryVariables>) {
        return ApolloReactHooks.useQuery<PlayersCompaniesQuery, PlayersCompaniesQueryVariables>(PlayersCompaniesDocument, baseOptions);
      }
export function usePlayersCompaniesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlayersCompaniesQuery, PlayersCompaniesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlayersCompaniesQuery, PlayersCompaniesQueryVariables>(PlayersCompaniesDocument, baseOptions);
        }
export type PlayersCompaniesQueryHookResult = ReturnType<typeof usePlayersCompaniesQuery>;
export type PlayersCompaniesLazyQueryHookResult = ReturnType<typeof usePlayersCompaniesLazyQuery>;
export type PlayersCompaniesQueryResult = ApolloReactCommon.QueryResult<PlayersCompaniesQuery, PlayersCompaniesQueryVariables>;
export const CompaniesDocument = gql`
    query Companies {
  getGames {
    state {
      companies {
        id
        cash
        trains
        initialOffer
        market
        floated
        parValue
        stockValue
        fullName
        stockPosition {
          row
          col
          z
        }
      }
    }
  }
}
    `;
export type CompaniesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CompaniesQuery, CompaniesQueryVariables>, 'query'>;

    export const CompaniesComponent = (props: CompaniesComponentProps) => (
      <ApolloReactComponents.Query<CompaniesQuery, CompaniesQueryVariables> query={CompaniesDocument} {...props} />
    );
    
export type CompaniesProps<TChildProps = {}> = ApolloReactHoc.DataProps<CompaniesQuery, CompaniesQueryVariables> & TChildProps;
export function withCompanies<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CompaniesQuery,
  CompaniesQueryVariables,
  CompaniesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, CompaniesQuery, CompaniesQueryVariables, CompaniesProps<TChildProps>>(CompaniesDocument, {
      alias: 'companies',
      ...operationOptions
    });
};

/**
 * __useCompaniesQuery__
 *
 * To run a query within a React component, call `useCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompaniesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
        return ApolloReactHooks.useQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, baseOptions);
      }
export function useCompaniesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, baseOptions);
        }
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesLazyQueryHookResult = ReturnType<typeof useCompaniesLazyQuery>;
export type CompaniesQueryResult = ApolloReactCommon.QueryResult<CompaniesQuery, CompaniesQueryVariables>;
export const PlayersDocument = gql`
    query Players {
  getGames {
    state {
      players {
        id
        cash
        shares {
          id
          amount
        }
      }
    }
  }
}
    `;
export type PlayersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PlayersQuery, PlayersQueryVariables>, 'query'>;

    export const PlayersComponent = (props: PlayersComponentProps) => (
      <ApolloReactComponents.Query<PlayersQuery, PlayersQueryVariables> query={PlayersDocument} {...props} />
    );
    
export type PlayersProps<TChildProps = {}> = ApolloReactHoc.DataProps<PlayersQuery, PlayersQueryVariables> & TChildProps;
export function withPlayers<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PlayersQuery,
  PlayersQueryVariables,
  PlayersProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, PlayersQuery, PlayersQueryVariables, PlayersProps<TChildProps>>(PlayersDocument, {
      alias: 'players',
      ...operationOptions
    });
};

/**
 * __usePlayersQuery__
 *
 * To run a query within a React component, call `usePlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayersQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlayersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlayersQuery, PlayersQueryVariables>) {
        return ApolloReactHooks.useQuery<PlayersQuery, PlayersQueryVariables>(PlayersDocument, baseOptions);
      }
export function usePlayersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlayersQuery, PlayersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlayersQuery, PlayersQueryVariables>(PlayersDocument, baseOptions);
        }
export type PlayersQueryHookResult = ReturnType<typeof usePlayersQuery>;
export type PlayersLazyQueryHookResult = ReturnType<typeof usePlayersLazyQuery>;
export type PlayersQueryResult = ApolloReactCommon.QueryResult<PlayersQuery, PlayersQueryVariables>;
export const LoginDocument = gql`
    mutation Login {
  login
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables> & TChildProps;
export function withLogin<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SubmitStockTurnDocument = gql`
    mutation SubmitStockTurn($args: StockTurnArgs!) {
  submitStockTurn(args: $args) {
    ...PlayersAndCompanies
  }
}
    ${PlayersAndCompaniesFragmentDoc}`;
export type SubmitStockTurnMutationFn = ApolloReactCommon.MutationFunction<SubmitStockTurnMutation, SubmitStockTurnMutationVariables>;
export type SubmitStockTurnComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SubmitStockTurnMutation, SubmitStockTurnMutationVariables>, 'mutation'>;

    export const SubmitStockTurnComponent = (props: SubmitStockTurnComponentProps) => (
      <ApolloReactComponents.Mutation<SubmitStockTurnMutation, SubmitStockTurnMutationVariables> mutation={SubmitStockTurnDocument} {...props} />
    );
    
export type SubmitStockTurnProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SubmitStockTurnMutation, SubmitStockTurnMutationVariables> & TChildProps;
export function withSubmitStockTurn<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SubmitStockTurnMutation,
  SubmitStockTurnMutationVariables,
  SubmitStockTurnProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SubmitStockTurnMutation, SubmitStockTurnMutationVariables, SubmitStockTurnProps<TChildProps>>(SubmitStockTurnDocument, {
      alias: 'submitStockTurn',
      ...operationOptions
    });
};

/**
 * __useSubmitStockTurnMutation__
 *
 * To run a mutation, you first call `useSubmitStockTurnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitStockTurnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitStockTurnMutation, { data, loading, error }] = useSubmitStockTurnMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useSubmitStockTurnMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SubmitStockTurnMutation, SubmitStockTurnMutationVariables>) {
        return ApolloReactHooks.useMutation<SubmitStockTurnMutation, SubmitStockTurnMutationVariables>(SubmitStockTurnDocument, baseOptions);
      }
export type SubmitStockTurnMutationHookResult = ReturnType<typeof useSubmitStockTurnMutation>;
export type SubmitStockTurnMutationResult = ApolloReactCommon.MutationResult<SubmitStockTurnMutation>;
export type SubmitStockTurnMutationOptions = ApolloReactCommon.BaseMutationOptions<SubmitStockTurnMutation, SubmitStockTurnMutationVariables>;