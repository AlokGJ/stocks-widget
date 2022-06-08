export const fetchSearchQueryResults = (symbols) => {
  return Promise.all(
    symbols.map(async (symbol) => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=37U54N5NZNKPRVZG`
      ).then(async (response) => {
        return response.json();
      });
      const dailyResponse = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=37U54N5NZNKPRVZG`
      ).then(async (response) => {
        return response.json();
      });
      return { ...response, ...dailyResponse };
    })
  );
};

export const searchQueryFetcher = async (query) => {
  return await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=37U54N5NZNKPRVZG`
  ).then((response) => response.json());
};
