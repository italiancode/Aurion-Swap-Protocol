let requestCount = 0;

export const RequestCounter = {
  increment: () => {
    requestCount++;
    return requestCount;
  },
  getCount: () => requestCount,
  reset: () => {
    requestCount = 0;
  }
}; 