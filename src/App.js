import { useCallback, useState } from "react";
import { Container, Icon, Label, Segment } from "semantic-ui-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchWidget, StocksWidget } from "./containers";
import "./styles.css";

const queryClient = new QueryClient();

const useSymbols = () => {
  const [symbols, setSymbols] = useState([]);

  const handleSymbolSelect = useCallback(
    (newSymbol) => {
      if (!symbols.includes(newSymbol))
        setSymbols((symbols) => [...symbols, newSymbol]);
    },
    [symbols]
  );

  const handleClearSymbol = useCallback((symbolToDelete) => {
    setSymbols((prevSymbols) =>
      prevSymbols.filter((symbol) => symbol !== symbolToDelete)
    );
  }, []);

  return {
    symbols,
    handleClearSymbol,
    handleSymbolSelect
  };
};

export default function App() {
  const { symbols, handleSymbolSelect, handleClearSymbol } = useSymbols();

  return (
    <Container fluid>
      <QueryClientProvider client={queryClient}>
        <Segment basic>
          <SearchWidget onSearch={handleSymbolSelect} />
        </Segment>
        <Segment basic style={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
          Queries:{" "}
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
