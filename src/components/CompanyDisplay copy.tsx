import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
  GridList,
  GridListTile,
  Divider
} from "@material-ui/core";
import { produce } from "immer";
import {
  useCompaniesQuery,
  useSubmitStockTurnMutation,
  StockOrderType
} from "../generated/graphql";

type OrderListItem = {
  amount: number;
  companyId: string;
};

export const CompanyDisplay: React.FC = () => {
  const { loading, error, data } = useCompaniesQuery();
  const [
    submitStockTurn,
    { loading: mutationLoading, error: mutationError }
  ] = useSubmitStockTurnMutation({ onError: e => console.log(e.message) });
  const [orders, setOrders] = useState([] as OrderListItem[]);

  if (loading) return <p>Loading...</p>;
  if (error || !data?.getGames || data.getGames.length < 1) {
    console.log(data);
    return <p>Error :(</p>;
  }
  return (
    <GridList cols={2} spacing={20}>
      {data.getGames[0].state.companies.map(
        ({
          id,
          cash,
          initialOffer,
          market,
          stockValue,
          parValue
        }) => (
          <GridListTile key={id} cols={1}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {id}
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
                    Value: {stockValue}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Par Value: {parValue}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Shares (I/M): {initialOffer} / {market}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Divider />
              <CardActions>
                <Button
                  onClick={() => {
                    setOrders(adjustOrders("INCREASE", id, orders));
                  }}
                  size="small"
                  color="primary"
                >
                  I
                </Button>
                <Button
                  onClick={() => {
                    setOrders(adjustOrders("INCREASE", id, orders));
                  }}
                  size="small"
                  color="primary"
                >
                  M
                </Button>
                <Button
                  onClick={() => {
                    setOrders(adjustOrders("DECREASE", id, orders));
                  }}
                  size="small"
                  color="primary"
                >
                  -
                </Button>
              </CardActions>
            </Card>
          </GridListTile>
        )
      )}
      <GridListTile cols={2}>
        <Typography variant="body2" color="textSecondary" component="p">
          Stock Turn
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
              orders: generateOrders(orders)
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
          {mutationError && "Error submitting turn"}
          {mutationLoading && "Submitting turn..."}
        </Typography>
      </GridListTile>
    </GridList>
  );
};

function adjustOrders(
  type: string,
  companyId: string,
  orders: OrderListItem[]
): OrderListItem[] {
  return produce<OrderListItem[]>(orders, newOrders => {
    const order = newOrders.find(order => order.companyId === companyId);

    if (type === "INCREASE") {
      if (
        (!order || order.amount === 0) &&
        newOrders.find(order => order.amount === 1)
      )
        return;
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
    .filter(order => order.amount !== 0)
    .map(order => {
      return {
        type:
          order.amount > 0 ? StockOrderType.BuyInitial : StockOrderType.Sell,
        amount: Math.abs(order.amount),
        companyId: order.companyId,
        value: 65
      };
    });
}
