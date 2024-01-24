import React from "react";

function Badge({ text, background, color }) {
  return (
    <span
      class={`${background} ${color} uppercase  text-xs font-bold me-2 px-2.5 py-0.5 rounded`}
    >
      {text}
    </span>
  );
}

export default Badge;
