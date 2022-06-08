import { Container, Icon, Label, Segment } from "semantic-ui-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchWidget, StocksWidget } from "./containers";
import useSymbols from "./hooks/usSymbols";
import "./styles.css";

const queryClient = new QueryClient();

export default function App() {
  const {
    symbols,
    handleSymbolSelect,
    handleClearSymbol,
    handleClearAllSymbols
  } = useSymbols();

  return (
    <Container fluid>
      <QueryClientProvider client={queryClient}>
        <Segment basic>
          <SearchWidget onSearch={handleSymbolSelect} />
        </Segment>
        <Segment basic style={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
          Queries:{" "}
          {symbols.length ? (
            <Label>
              Clear All
              <Icon name="close" onClick={() => handleClearAllSymbols([])} />
            </Label>
          ) : null}
          {symbols.map((symbol) => (
            <Label>
              {symbol}
              <Icon name="close" onClick={() => handleClearSymbol(symbol)} />
            </Label>
          ))}
        </Segment>
        <Segment basic style={{ margin: 0 }}>
          <StocksWidget symbols={symbols} />
        </Segment>
      </QueryClientProvider>
    </Container>
  );
}
