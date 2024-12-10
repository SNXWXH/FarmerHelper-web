const calculateDaysDifference = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end.getTime() - start.getTime();
  const dayDifference = timeDifference / (1000 * 3600 * 24);
  return dayDifference + 1;
};

export default calculateDaysDifference;
