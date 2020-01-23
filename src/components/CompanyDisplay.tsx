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
  type: StockOrderType;
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

  const state = data.getGames[0].state;
  
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell align="right">Cash</TableCell>
            <TableCell align="right">Trains</TableCell>
            <TableCell align="left">IPO | Market </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell component="th" scope="row">
                  {company.fullName}
                </TableCell>
                <TableCell align="right">{company.cash}</TableCell>
                <TableCell align="right">{company.trains.join(" ")}</TableCell>
                <TableCell>
                  <ButtonGroup color="primary" aria-label="outlined primary button group">
                    {
                      <Button
                        className="company-button"
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          company.initialOffer && setOrders(adjustOrders(StockOrderType.BuyInitial, company.id, orders));
                        }}
                      >
                        {company.parValue
                          ? company.initialOffer
                            ? `${company.initialOffer}/$${company.parValue}`
                            : "-"
                          : "IPO"}
                      </Button>
                    }
                    {
                      <Button
                        className="company-button"
                        variant="outlined"
                        onClick={() => {
                          company.market && setOrders(adjustOrders(StockOrderType.BuyMarket, company.id, orders));
                        }}
                      >
                        {company.market && company.stockValue ? `${company.market}/$${company.stockValue}` : "-"}
                      </Button>
                    }
                    {
                      <Button
                        className="company-button"
                        variant="outlined"
                        onClick={() => {
                          setOrders(adjustOrders(StockOrderType.Sell, company.id, orders));
                        }}
                      >
                        Sell
                      </Button>
                    }
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Typography variant="body2" color="textSecondary" component="p">
        Orders
      </Typography>
      {orders.map((order) => {
        const type_to_string = { BUY_INITIAL: "Buy from IPO", BUY_MARKET: "Buy from Market", SELL: "Sell" };
        return (
          <p>
            {type_to_string[order.type]}: {order.companyId} x {order.amount}
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

function adjustOrders(type: StockOrderType, companyId: string, orders: OrderListItem[]): OrderListItem[] {
  return produce<OrderListItem[]>(orders, (newOrders) => {
    const order = newOrders.find((order) => order.companyId === companyId);

    if (order) {
      if (order.type === StockOrderType.Sell && order.type === type) order.amount++;
      else {
        order.type = type;
        order.amount = 1;
       }
    } else if (StockOrderType.Sell || !newOrders.find((order) => order.type !== StockOrderType.Sell)) {
       newOrders.push({ amount: 1, companyId, type });
    }
  });
}

function generateOrders(orders: OrderListItem[]) {
  return orders
    .filter((order) => order.amount !== 0)
    .map((order) => {
      return {
        ...order,
        value: 65,
      };
    });
}
