import React from "react";
import { Helmet } from "react-helmet-async";
import PricingSection from "@components/sections/Pricing";
import FAQ from "@components/sections/FAQ";
import styles from "./Pricing.module.scss";

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing - AI Background Remover</title>
        <meta
          name="description"
          content="Choose the perfect plan for your background removal needs. Free tier available with 5 credits. Pro and Business plans for professionals."
        />
      </Helmet>

      <div className={styles.pricing}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>Simple, Transparent Pricing</h1>
            <p className={styles.subtitle}>
              Start for free, upgrade when you need more
            </p>
          </div>
        </div>

        <PricingSection />
        <FAQ />
      </div>
    </>
  );
};

export default Pricing;
