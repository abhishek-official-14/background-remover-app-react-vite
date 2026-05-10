import React from "react";
import { Link } from "react-router-dom";
import { FiTwitter, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import styles from "./Footer.module.scss";

const socialLinks = [
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: FiTwitter,
    external: true,
  },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: FiGithub,
    external: true,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: FiLinkedin,
    external: true,
  },
  {
    href: "mailto:contact@backgroundremover.ai",
    label: "Email",
    icon: FiMail,
    external: false,
  },
];

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
              {socialLinks.map(({ href, label, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Navigate</h4>
            <ul className={styles.links}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Legal</h4>
            <ul className={styles.links}>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} AI Background Remover. All rights reserved.</p>
          <div className={styles.legal}>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
