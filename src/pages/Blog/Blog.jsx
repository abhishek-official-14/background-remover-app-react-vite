import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@components/common/Card";
import styles from "./Blog.module.scss";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated blog posts - replace with actual API call
    const fetchPosts = async () => {
      const mockPosts = [
        {
          id: 1,
          title: "How AI is Revolutionizing Background Removal",
          excerpt:
            "Discover how artificial intelligence is making background removal faster and more accurate than ever before.",
          date: "2026-01-15",
          author: "John Doe",
          category: "AI Technology",
          image: "/blog/ai-bg-removal.jpg",
        },
        {
          id: 2,
          title: "10 Tips for Perfect Product Photography",
          excerpt:
            "Learn professional techniques for capturing stunning product photos with clean backgrounds.",
          date: "2026-01-10",
          author: "Jane Smith",
          category: "Photography",
          image: "/blog/product-photography.jpg",
        },
        {
          id: 3,
          title: "The Future of E-commerce Image Processing",
          excerpt:
            "How automated image processing is transforming online retail and improving conversion rates.",
          date: "2026-01-05",
          author: "Mike Johnson",
          category: "E-commerce",
          image: "/blog/ecommerce-trends.jpg",
        },
      ];

      setTimeout(() => {
        setPosts(mockPosts);
        setLoading(false);
      }, 1000);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog - AI Background Remover | Tips & Tutorials</title>
        <meta
          name="description"
          content="Latest articles about AI background removal, photography tips, and image processing techniques."
        />
      </Helmet>

      <div className={styles.blog}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>Blog</h1>
            <p className={styles.subtitle}>
              Latest insights, tips, and tutorials about background removal and
              image processing
            </p>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading posts...</div>
          ) : (
            <div className={styles.grid}>
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.id}`} className={styles.postLink}>
                    <Card className={styles.post}>
                      <div className={styles.image}>
                        <img src={post.image} alt={post.title} />
                      </div>
                      <div className={styles.content}>
                        <div className={styles.meta}>
                          <span className={styles.category}>
                            {post.category}
                          </span>
                          <span className={styles.date}>{post.date}</span>
                        </div>
                        <h2 className={styles.postTitle}>{post.title}</h2>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                        <div className={styles.author}>By {post.author}</div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
