import { Card } from "semantic-ui-react";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";

const fetchSearchQueryResults = (symbols) => {
  return Promise.all(
    symbols.map((symbol) =>
      fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=37U54N5NZNKPRVZG`
      ).then((response) => response.json())
    )
  );
};

const StocksWidget = ({ symbols }) => {
  const { data, refetch: refetchResults } = useQuery(
    ["results", symbols],
    () => fetchSearchQueryResults(symbols),
    {
      refetchOnWindowFocus: false,
      enabled: false
    }
  );

  useEffect(() => {
    if (symbols.length) refetchResults();
  }, [symbols.length, refetchResults]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Card.Group>
        {data &&
          data.map((stock) => {
            if (!stock || !Object.keys(stock).length || stock.Note) return null;
            return (
              <Card>
                <Card.Content>
                  <Card.Header>{stock.Symbol}</Card.Header>
                  <Card.Meta>{stock.Name}</Card.Meta>
                </Card.Content>
              </Card>
            );
          })}
      </Card.Group>
    </>
  );
};

export default StocksWidget;
