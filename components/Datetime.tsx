import * as React from "react";

const Datetime = ({ timestamp }) => {
  const date = React.useMemo(() => {
    const milliseconds = 1000 * timestamp.seconds + timestamp.nanoseconds / 1e6;
    return new Date(milliseconds);
  }, [timestamp]);

  return <time dateTime={date.toISOString()}>{date.toLocaleDateString()}</time>;
};

export default Datetime;
