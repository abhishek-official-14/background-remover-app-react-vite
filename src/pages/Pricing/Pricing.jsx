import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FiCheck, FiChevronDown } from "react-icons/fi";
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

const faqs = [
  {
    question: "How does the AI background removal work?",
    answer:
      "Our AI uses advanced deep learning models trained on millions of images to detect and separate foreground subjects from backgrounds with pixel-perfect accuracy.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes! We take privacy seriously. All images are encrypted and automatically deleted after processing. We never store your images on our servers.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support JPG, PNG, and WEBP formats. Maximum file size is 10MB per image.",
  },
  {
    question: "Can I process multiple images at once?",
    answer:
      "Yes, our batch processing feature allows you to process up to 10 images simultaneously.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "You can try the tool without an account for basic processing. However, creating an account gives you access to batch processing, history, and more features.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your purchase.",
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openIndex, setOpenIndex] = useState(null);

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
                  {plan.credits} credits per {billingCycle === "yearly" ? "year" : "month"}
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

          <section className={styles.faq}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Got questions? We've got answers</p>
            <div className={styles.list}>
              {faqs.map((faq, index) => (
                <div key={faq.question} className={styles.item}>
                  <button
                    className={styles.question}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <FiChevronDown
                      className={`${styles.icon} ${openIndex === index ? styles.rotated : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        className={styles.answer}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Pricing;
