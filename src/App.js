import { useState } from "react";
import { Container, Segment } from "semantic-ui-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchWidget, StocksWidget } from "./containers";
import "./styles.css";

const queryClient = new QueryClient();

export default function App() {
  const [symbols, setSymbols] = useState([]);
  return (
    <Container fluid>
      <QueryClientProvider client={queryClient}>
        <Segment basic>
          <SearchWidget onSearch={setSymbols} symbols={symbols} />
        </Segment>
        <Segment basic>
          <StocksWidget symbols={symbols} />
        </Segment>
      </QueryClientProvider>
    </Container>
  );
}
