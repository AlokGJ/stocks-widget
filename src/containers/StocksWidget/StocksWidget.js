import { Card, Dropdown, Label, Segment } from "semantic-ui-react";
import timerOptions from "./timer-options";
import { useStocks } from "../../hooks/useStocks";
import CustomCard from "./CustomCard";
import "./stocks-widget.css";

const StocksWidget = ({ symbols }) => {
  const {
    data,
    handleRefreshRateChange,
    refetchIntervalInMillis,
    isRefetching
  } = useStocks(symbols);
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
        <Card.Group className="card-group" style={{ paddingTop: "10px" }}>
          {data &&
            data.map((stock, idx) => {
              if (
                !stock ||
                !Object.keys(stock).length ||
                stock.Note ||
                stock.Information
              )
                return null;
              return (
                <CustomCard
                  index={idx}
                  isFetching={isRefetching}
                  stock={stock}
                />
              );
            })}
        </Card.Group>
      </section>
    </>
  );
};

export default StocksWidget;
