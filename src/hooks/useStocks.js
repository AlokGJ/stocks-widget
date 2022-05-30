import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { fetchSearchQueryResults } from "../api";

export const useStocks = (symbols) => {
  const [refetchIntervalInMillis, setRefetchIntervalInMillis] = useState(15000);
  const { data, isRefetching } = useQuery(
    ["results", symbols],
    () => fetchSearchQueryResults(symbols),
    {
      refetchInterval: refetchIntervalInMillis
    }
  );

  const handleRefreshRateChange = useCallback(
    (_, data) => setRefetchIntervalInMillis(data.value),
    [setRefetchIntervalInMillis]
  );

  return {
    data,
    handleRefreshRateChange,
    refetchIntervalInMillis,
    isRefetching
  };
};
