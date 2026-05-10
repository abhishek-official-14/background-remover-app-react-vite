import React from "react";
import { Link } from "react-router-dom";
import { FiTwitter, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import styles from "./Footer.module.scss";
import { primaryNavItems, footerLegalLinks } from "@/config/navigation";

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
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="mailto:contact@backgroundremover.ai" aria-label="Email">
                <FiMail />
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Navigate</h4>
            <ul className={styles.links}>
              {primaryNavItems.map((item) => (
                <li key={item.path}><Link to={item.path}>{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Legal</h4>
            <ul className={styles.links}>
              {footerLegalLinks.map((item) => (
                <li key={item.path}><Link to={item.path}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} AI Background Remover. All rights reserved.</p>
          <div className={styles.legal}>
            {footerLegalLinks.map((item) => (
              <Link key={item.path} to={item.path}>{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
