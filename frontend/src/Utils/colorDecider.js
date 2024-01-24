export const color_Decider = (status) => {
  let color;
  let background;
  if (status === "Pending") {
    background = "bg-yellow-100";
    color = "text-yellow-800";
  } else if (status === "Completed") {
    background = "bg-green-100";
    color = "text-green-800";
  } else {
    background = "bg-blue-100";
    color = "text-blue-800";
  }

  return color, background;
};
export const Task_Color_Decider = (status) => {
  let color;
  let background;
  if (status === "Medium") {
    background = "bg-yellow-100";
    color = "text-yellow-800";
  } else if (status === "Low") {
    background = "bg-green-100";
    color = "text-green-800";
  } else {
    background = "bg-red-100";
    color = "text-red-800";
  }

  return color, background;
};
