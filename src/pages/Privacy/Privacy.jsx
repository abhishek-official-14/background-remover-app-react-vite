import React from "react";
import { Helmet } from "react-helmet-async";
import styles from "./Privacy.module.scss";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - AI Background Remover</title>
        <meta
          name="description"
          content="Learn how we protect your privacy and handle your images. We never store your images and ensure complete data security."
        />
      </Helmet>

      <div className={styles.privacy}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.date}>Last updated: January 1, 2026</p>
          </div>

          <div className={styles.content}>
            <section>
              <h2>1. Introduction</h2>
              <p>
                At AI Background Remover, we take your privacy seriously. This
                Privacy Policy explains how we handle your data when you use our
                background removal service.
              </p>
            </section>

            <section>
              <h2>2. Data Collection</h2>
              <p>We collect minimal data necessary to provide our service:</p>
              <ul>
                <li>Images you upload for processing</li>
                <li>Processing metadata (file size, processing time)</li>
                <li>Usage statistics for service improvement</li>
              </ul>
            </section>

            <section>
              <h2>3. Image Processing & Storage</h2>
              <p>
                <strong>We do NOT store your images.</strong> All images are:
              </p>
              <ul>
                <li>Processed in real-time</li>
                <li>Automatically deleted immediately after processing</li>
                <li>Never shared with third parties</li>
                <li>Used only for the requested background removal</li>
              </ul>
            </section>

            <section>
              <h2>4. Data Security</h2>
              <p>We employ industry-standard security measures including:</p>
              <ul>
                <li>End-to-end encryption for all image uploads</li>
                <li>Secure API endpoints</li>
                <li>Regular security audits</li>
                <li>GDPR compliance for European users</li>
              </ul>
            </section>

            <section>
              <h2>5. Cookies</h2>
              <p>We use essential cookies for:</p>
              <ul>
                <li>Authentication (if you have an account)</li>
                <li>Preferences storage (theme, settings)</li>
                <li>Analytics to improve our service</li>
              </ul>
            </section>

            <section>
              <h2>6. Third-Party Services</h2>
              <p>We use trusted third-party services for:</p>
              <ul>
                <li>Payment processing (Stripe)</li>
                <li>Analytics (Google Analytics)</li>
                <li>Performance monitoring</li>
              </ul>
              <p>
                These services have their own privacy policies and data handling
                practices.
              </p>
            </section>

            <section>
              <h2>7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Request data deletion</li>
                <li>Opt-out of analytics</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2>8. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, contact us at:
              </p>
              <p>Email: privacy@backgroundremover.ai</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
