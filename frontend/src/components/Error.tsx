import { Navigate, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  //   @ts-ignore
  if (error.status === 404) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <h3>something went wrong</h3>
    </div>
  );
};
export default Error;
