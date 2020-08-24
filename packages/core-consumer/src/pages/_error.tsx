/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Error = ({ statusCode }: any) => {
  return <div>ERRROR {statusCode}</div>;
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
