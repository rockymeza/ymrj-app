/** @jsx jsx */
import { jsx, Box } from "theme-ui";

const Spacer = props => {
  return <Box {...props} sx={{ flex: "1 1 auto" }} />;
};

export default Spacer;
