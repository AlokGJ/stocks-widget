import { Card, Dropdown, Item, Label, Segment } from "semantic-ui-react";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import timerOptions from "./timer-options";

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
  const [refetchIntervalInMillis, setRefetchIntervalInMillis] = useState(15000);
  const { data, refetch: refetchResults, isSuccess } = useQuery(
    ["results", symbols],
    () => fetchSearchQueryResults(symbols),
    {
      refetchInterval: refetchIntervalInMillis
    }
  );

  useEffect(() => {
    symbols.length && refetchResults();
  }, [symbols.length, refetchResults]);

  const handleRefreshRateChange = useCallback(
    (_, data) => setRefetchIntervalInMillis(data.value),
    [setRefetchIntervalInMillis]
  );

  return (
    <>
      <section style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <Segment
            basic
            style={{
              padding: 0,
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Label>{`Results: ${symbols.length}`}</Label>
            <Label>
              {"Refresh every: "}
              <Dropdown
                labeled
                button
                placeholder="Refresh time interval"
                options={timerOptions}
                onChange={handleRefreshRateChange}
                value={refetchIntervalInMillis}
              />
            </Label>
          </Segment>
        </div>
        <Card.Group style={{ paddingTop: "10px" }}>
          {data &&
            data.map((stock) => {
              if (
                !stock ||
                !Object.keys(stock).length ||
                stock.Note ||
                stock.Information
              )
                return null;
              return (
                <Card fluid>
                  <Card.Content>
                    <Card.Header>{stock.Symbol}</Card.Header>
                    <Card.Meta>{stock.Name}</Card.Meta>
                    <Item.Group>
                      <Item>
                        <Item.Content>
                          <Item.Header>Industry</Item.Header>
                          <Item.Meta>{stock.Industry}</Item.Meta>
                        </Item.Content>
                      </Item>
                      <Item>
                        <Item.Content>
                          <Item.Header>Description</Item.Header>
                          <Item.Meta>{stock.Description}</Item.Meta>
                        </Item.Content>
                      </Item>
                      <Item>
                        <Item.Content>
                          <Item.Header>PE Ratio</Item.Header>
                          <Item.Meta>{stock.PERatio}</Item.Meta>
                        </Item.Content>
                      </Item>
                      <Item>
                        <Item.Content>
                          <Item.Header>Market Cap</Item.Header>
                          <Item.Meta>{stock.MarketCapitalization}</Item.Meta>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Card.Content>
                </Card>
              );
            })}
        </Card.Group>
      </section>
    </>
  );
};

export default StocksWidget;
