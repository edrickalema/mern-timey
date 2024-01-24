export const TodaysDate = () =>
  new Date(Date.now()).toISOString().split("T")[0].replace(/-/g, "-");
