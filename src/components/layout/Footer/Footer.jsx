import React from "react";
import { Link } from "react-router-dom";
import { FiTwitter, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import styles from "./Footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h3 className={styles.title}>AI Background Remover</h3>
            <p className={styles.description}>
              Professional AI-powered background removal with precise edge
              detection. Remove backgrounds instantly from any image.
            </p>
            <div className={styles.social}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiTwitter />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin />
              </a>
              <a href="mailto:contact@backgroundremover.ai">
                <FiMail />
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Product</h4>
            <ul className={styles.links}>
              <li>
                <Link to="/features">Features</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/api">API</Link>
              </li>
              <li>
                <Link to="/changelog">Changelog</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Resources</h4>
            <ul className={styles.links}>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/docs">Documentation</Link>
              </li>
              <li>
                <Link to="/help">Help Center</Link>
              </li>
              <li>
                <Link to="/tutorials">Tutorials</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Company</h4>
            <ul className={styles.links}>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {currentYear} AI Background Remover. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
