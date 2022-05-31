export const fetchSearchQueryResults = (symbols) => {
  return Promise.all(
    symbols.map((symbol) =>
      fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=37U54N5NZNKPRVZG`
      ).then((response) => response.json())
    )
  );
};

export const searchQueryFetcher = async (query) => {
  return await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=37U54N5NZNKPRVZG`
  ).then((response) => response.json());
};
