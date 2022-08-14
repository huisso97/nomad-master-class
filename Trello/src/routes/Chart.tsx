import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchCoinHistory } from "./api";

interface ChartProps {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  console.log(data);
  return <div>Chart</div>;
}

export default Chart;
