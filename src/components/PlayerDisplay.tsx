/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  GridList,
  GridListTile,
  Divider,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Badge,
  Button,
} from "@material-ui/core";
import { usePlayersQuery, useLoginMutation } from "../generated/graphql";

export function PlayerDisplay() {
  const { loading, error, data } = usePlayersQuery();
  const [login] = useLoginMutation();

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(data);
    return <p>Error :(</p>;
  }
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="right">Cash</TableCell>
            <TableCell align="right">Shares</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.getGames?.length &&
            data.getGames[0].state.players.map((player) => (
              <TableRow key={player.id}>
                <TableCell component="th" scope="row">
                  {player.id.split("/")[1]}
                </TableCell>
                <TableCell align="right">{player.cash}</TableCell>
                <TableCell align="right">
                  {player.shares.map(
                    (share) =>
                      // <Badge badgeContent={share.amount} color="primary">{share.id}</Badge>
                      `${share.id}(${share.amount}) `,
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button onClick={() => {login()}}>Login</Button>
    </TableContainer>
  );
}
