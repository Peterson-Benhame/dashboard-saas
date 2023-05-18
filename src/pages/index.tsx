import type { NextPage } from "next";

import { Faq } from "../components/faq";
import { Features1 } from "../components/features1";
import { Features2 } from "../components/features2";
import { Features3 } from "../components/features3";
import { Footer } from "../components/footer";
import { Hero } from "../components/hero";
import { Layout } from "../components/navbar/layout";
import { Nav } from "../components/navbar/navbar";
import { Plans } from "../components/plans";
import { Statistics } from "../components/statistics";
import { Box } from "../components/styles/box";
import { Testimonials } from "../components/tesminonials";
import { Trial } from "../components/trial";
import { Trusted } from "../components/trusted";

const Home: NextPage = () => {
  return (
    <Layout>
      <Nav />
      <Box as="main">
        <Hero />
        <Trusted />
        <Features1 />
        <Features2 />
        <Features3 />
        <Testimonials />
        <Statistics />
        <Plans />
        <Faq />
        <Trial />
        <Footer />
      </Box>
    </Layout>
  );
};

export default Home;
