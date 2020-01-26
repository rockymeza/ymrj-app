import { Box, Button, Flex, Heading } from "theme-ui";

import AuthButton from "./AuthButton";
import Spacer from "./Spacer";

const Layout = ({ children }) => {
  return (
    <Box>
      <Flex>
        <Heading>姨妈日记</Heading>
        <Spacer />
        <AuthButton />
      </Flex>

      {children}
    </Box>
  );
};

export default Layout;
