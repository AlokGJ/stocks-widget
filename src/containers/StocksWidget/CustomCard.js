import { Card, Divider, Item, Loader } from "semantic-ui-react";

const CustomCard = ({ stock, index, isFetching }) => (
  <Card className="card" fluid key={index}>
    <Card.Content>
      <Card.Header>
        {`${stock.Symbol} `}
        {isFetching ? <Loader active inline size="tiny" /> : ""}
      </Card.Header>
      <Card.Meta>{stock.Name}</Card.Meta>
      <Divider />
      <Item.Group>
        <Item key={stock.Name}>
          <Item.Content>
            <Item.Header>Industry</Item.Header>
            <Item.Meta>{stock.Industry}</Item.Meta>
          </Item.Content>
        </Item>
        <Item key={`traded${index}`}>
          <Item.Content>
            <Item.Header>Last traded on</Item.Header>
            <Item.Meta>
              {stock["Meta Data"]["3. Last Refreshed"]
                ? stock["Meta Data"]["3. Last Refreshed"]
                : "--"}
            </Item.Meta>
          </Item.Content>
        </Item>
        <Item key={`price${index}`}>
          <Item.Content>
            <Item.Header>Stock Price</Item.Header>
            <Item.Meta>
              {stock["Time Series (Daily)"][
                stock["Meta Data"]["3. Last Refreshed"]
              ]["4. close"]
                ? stock["Time Series (Daily)"][
                    stock["Meta Data"]["3. Last Refreshed"]
                  ]["4. close"]
                : "--"}
            </Item.Meta>
          </Item.Content>
        </Item>
        <Item key={`desc${index}`}>
          <Item.Content>
            <Item.Header>Description</Item.Header>
            <Item.Meta>{stock.Description}</Item.Meta>
          </Item.Content>
        </Item>
        <Item key={stock.PERatio}>
          <Item.Content>
            <Item.Header>PE Ratio</Item.Header>
            <Item.Meta>{stock.PERatio}</Item.Meta>
          </Item.Content>
        </Item>
        <Item key={stock.MarketCapitalization}>
          <Item.Content>
            <Item.Header>Market Cap</Item.Header>
            <Item.Meta>{stock.MarketCapitalization}</Item.Meta>
          </Item.Content>
        </Item>
      </Item.Group>
    </Card.Content>
  </Card>
);

export default CustomCard;
