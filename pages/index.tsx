import { Box } from "theme-ui";

import Layout from "../components/Layout";
import useAuth from "../utils/useAuth";

const HomePage = () => {
  const auth = useAuth();
  return (
    <Layout>
      <Box as="pre">{JSON.stringify(auth, null, 2)}</Box>
    </Layout>
  );
};

export default HomePage;
