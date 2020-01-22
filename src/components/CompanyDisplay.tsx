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

type OrderListItem = {
  amount: number;
  companyId: string;
};

export const CompanyDisplay: React.FC = () => {
  const { loading, error, data } = useCompaniesQuery();
  const [submitStockTurn, { loading: mutationLoading, error: mutationError }] = useSubmitStockTurnMutation({
    onError: (e) => console.log(e.message),
  });
  const [orders, setOrders] = useState([] as OrderListItem[]);

  if (loading) return <p>Loading...</p>;
  if (error || !data?.getGames || data.getGames.length < 1) {
    console.log(data);
    return <p>Error :(</p>;
  }
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell align="right">Cash</TableCell>
            <TableCell align="right">Value (IPO)</TableCell>
            <TableCell align="right">Trains</TableCell>
            <TableCell align="right">Market | IPO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.getGames?.length &&
            data.getGames[0].state.companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell component="th" scope="row">
                  {company.fullName}
                </TableCell>
                <TableCell align="right">{company.cash}</TableCell>
                <TableCell align="right">
                  {company.stockValue && `${company.stockValue} (${company.parValue})`}
                </TableCell>
                <TableCell align="right">{company.trains.join(" ")}</TableCell>
                <TableCell>
                  <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setOrders(adjustOrders("INCREASE", company.id, orders));
                      }}
                    >
                      {company.market}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setOrders(adjustOrders("INCREASE", company.id, orders));
                      }}
                    >
                      {company.initialOffer}
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Typography variant="body2" color="textSecondary" component="p">
        Orders
      </Typography>
      {orders.map((order: { amount: number; companyId: string }) => {
        return (
          <p>
            {order.companyId}: {order.amount}
          </p>
        );
      })}
      <Button
        onClick={() => {
          const args = {
            gameId: "c5ab03f9-b8bf-47f8-a04b-23745e1e92d8",
            orders: generateOrders(orders),
          };
          setOrders([]);
          submitStockTurn({ variables: { args: args } });
        }}
        size="small"
        color="primary"
      >
        Submit
      </Button>
      <Typography>
        {mutationError && `${mutationError.graphQLErrors[0].message}`}
        {mutationLoading && "Submitting turn..."}
      </Typography>
    </TableContainer>
  );
};

function adjustOrders(type: string, companyId: string, orders: OrderListItem[]): OrderListItem[] {
  return produce<OrderListItem[]>(orders, (newOrders) => {
    const order = newOrders.find((order) => order.companyId === companyId);

    if (type === "INCREASE") {
      if ((!order || order.amount === 0) && newOrders.find((order) => order.amount === 1)) return;
      if (order && order.amount < 1) order.amount++;
      else if (!order) newOrders.push({ amount: 1, companyId: companyId });
    } else if (type === "DECREASE") {
      if (order) order.amount--;
      else if (!order) newOrders.push({ amount: -1, companyId: companyId });
    }
  });
}

function generateOrders(orders: OrderListItem[]) {
  return orders
    .filter((order) => order.amount !== 0)
    .map((order) => {
      return {
        type: order.amount > 0 ? StockOrderType.BuyInitial : StockOrderType.Sell,
        amount: Math.abs(order.amount),
        companyId: order.companyId,
        value: 65,
      };
    });
}
