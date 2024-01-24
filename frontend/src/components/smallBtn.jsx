import React from "react";

function smallBtn({text}) {
  return (
    <button
      type='button'
      class='px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
    >
      {text}
    </button>
  );
}

export default smallBtn;
