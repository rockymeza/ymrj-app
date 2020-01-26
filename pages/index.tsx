import { Box } from "theme-ui";

import Layout from "../components/Layout";
import PeriodsList from "../components/PeriodsList";
import useAuth from "../utils/useAuth";

const HomePage = () => {
  const auth = useAuth();
  return <Layout>{auth.user && <PeriodsList uid={auth.user.uid} />}</Layout>;
};

export default HomePage;
