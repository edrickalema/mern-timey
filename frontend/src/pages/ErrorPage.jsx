import React from "react";
import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  // Error page styles
  if (error.status === 404) {
    return (
      <div className='error-page'>
        <div>
          <h1>{error.status}</h1>
          <h3>The page is not found</h3>
          <Link to='/'>
            <button>Go back to home page</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className='error-page'>
        <h1>Something went Wrong!</h1>
      </div>
    );
  }
}

export default ErrorPage;
