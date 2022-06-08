import { useCallback, useState } from "react";
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

  const handleClearAllSymbols = useCallback(() => {
    setSymbols(() => []);
  }, []);

  return {
    symbols,
    handleClearSymbol,
    handleSymbolSelect,
    handleClearAllSymbols
  };
};

export default useSymbols;
