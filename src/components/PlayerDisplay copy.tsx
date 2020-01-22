import React from "react";

import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  GridList,
  GridListTile,
  Divider
} from "@material-ui/core";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export const PLAYER = gql`
  query PlayerQuery{
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

export function PlayerDisplay()  {
  const { loading, error, data } = useQuery(PLAYER);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(data);
    return <p>Error :(</p>;
  }
  return (
    <GridList cols={2} spacing={20}>
      {data.getGames[0].state.players.map(
        ({
          id,
          cash,
          shares
        }: {
          id: string;
          cash: number;
          shares: {
            id: string;
            amount: number;
          }[];
        }) => (
          <GridListTile key={id}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {id.split("/")[1]}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Cash: {cash}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <Divider />
                    {shares.map(share => {
                      return (
                        <p>
                          {share.id}: {share.amount}
                        </p>
                      );
                    })}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </GridListTile>
        )
      )}
    </GridList>
  );
}
