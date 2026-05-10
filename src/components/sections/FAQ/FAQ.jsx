import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import styles from "./FAQ.module.scss";

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

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className={styles.faq}>
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Got questions? We've got answers</p>

        <div className={styles.list}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.item}>
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
      </div>
    </section>
  );
};

export default FAQ;
