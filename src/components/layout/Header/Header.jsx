import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { useTheme } from "@contexts/ThemeContext";
import { useUser } from "@contexts/UserContext";
import styles from "./Header.module.scss";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Pricing", path: "/pricing" },
    { label: "Blog", path: "/blog" },
  ];

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>AI</div>
          <span className={styles.logoText}>BG Remover</span>
        </Link>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.open : ""}`}>
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={styles.navLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          <div className={styles.actions}>
            <button onClick={toggleTheme} className={styles.themeToggle}>
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>

            {user ? (
              <div className={styles.userMenu}>
                <button className={styles.userBtn}>
                  <FiUser />
                  <span>{user.name}</span>
                </button>
                <div className={styles.dropdown}>
                  <button onClick={() => navigate("/dashboard/settings")}>
                    <FiSettings /> Settings
                  </button>
                  <button onClick={logout}>
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                className={styles.loginBtn}
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            )}
          </div>
        </nav>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
