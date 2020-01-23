/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
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
  Link,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { produce } from "immer";
import { useCompaniesQuery, useSubmitStockTurnMutation, StockOrderType, Company } from "../generated/graphql";
import { companyColors } from "../data";

const numColumns = [15, 15, 12, 10, 8, 7, 6, 5, 4, 4, 4].reverse();
const stockValues = [
  10,
  20,
  30,
  40,
  45,
  50,
  55,
  60,
  65,
  70,
  75,
  80,
  90,
  100,
  110,
  125,
  140,
  155,
  175,
  200,
  225,
  255,
  285,
  315,
  350,
];

export const StockMarketDisplay: React.FC = () => {
  const { loading, error, data } = useCompaniesQuery();

  if (loading) return <p>Loading...</p>;
  if (error || !data?.getGames || data.getGames.length < 1) {
    console.log(data);
    return <p>Error :(</p>;
  }

  const grid: JSX.Element[] = [];
  const size = 40;

  for (let row = 0; row < numColumns.length; row++) {
    for (let col = 0; col < numColumns[row]; col++) {
      grid.push(
        <g key={`stockmarket-grid-${row}-${col}}`} transform={`translate(${col * size} ${(numColumns.length - row) * size})`}>
          <rect width={size} height={size} />
          <text x="2" y="12">
            {stockValues[row + col]}
          </text>
        </g>,
      );
    }
  }

  const tokens = data.getGames[0].state.companies
    .filter((company) => company.stockPosition !== null)
    .map((company) => (
      <circle key={`stockmarket-${company.id}`}
        fill={companyColors[company.id]}
        cx={(company.stockPosition!.col + 0.5) * size}
        cy={(numColumns.length - company.stockPosition!.row + 0.5) * size}
        r={(size / 2) * 0.6}
      />
    ));

  return (
    <Paper>
      <svg width="100%" height={(numColumns.length + 1) * size}>
        {grid}
        {tokens}
      </svg>
    </Paper>
  );
};
