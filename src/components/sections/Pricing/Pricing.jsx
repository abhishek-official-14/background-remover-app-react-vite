import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import Button from "@components/common/Button";
import styles from "./Pricing.module.scss";

const plans = [
  {
    name: "Free",
    price: 0,
    credits: 5,
    features: [
      "5 free credits",
      "Basic background removal",
      "Standard quality output",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: 9.99,
    credits: 100,
    features: [
      "100 credits",
      "HD quality output",
      "Batch processing",
      "Priority support",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: 49.99,
    credits: 1000,
    features: [
      "1000 credits",
      "Enterprise features",
      "Dedicated support",
      "Custom integration",
      "SLA guarantee",
    ],
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <section className={styles.pricing}>
      <div className="container">
        <h2 className="section-title">Simple, Transparent Pricing</h2>
        <p className="section-subtitle">
          Choose the plan that works best for you
        </p>

        <div className={styles.toggle}>
          <button
            className={`${styles.option} ${billingCycle === "monthly" ? styles.active : ""}`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            className={`${styles.option} ${billingCycle === "yearly" ? styles.active : ""}`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly (Save 20%)
          </button>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`${styles.plan} ${plan.popular ? styles.popular : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}

              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.price}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>
                  {billingCycle === "yearly"
                    ? (plan.price * 0.8).toFixed(2)
                    : plan.price}
                </span>
                <span className={styles.period}>
                  /{billingCycle === "yearly" ? "year" : "month"}
                </span>
              </div>

              <div className={styles.credits}>
                {plan.credits} credits per{" "}
                {billingCycle === "yearly" ? "year" : "month"}
              </div>

              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <FiCheck className={styles.check} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant={plan.popular ? "primary" : "outline"} fullWidth>
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
