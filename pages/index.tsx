import { Box } from "theme-ui";
import Head from "next/head";

import Layout from "../components/Layout";
import PeriodsList from "../components/PeriodsList";
import useAuth from "../utils/useAuth";

const HomePage = () => {
  const auth = useAuth();
  return (
    <Layout>
      <Head>
        <title>姨妈日记</title>
      </Head>
      {auth.user && <PeriodsList uid={auth.user.uid} />}
    </Layout>
  );
};

export default HomePage;
