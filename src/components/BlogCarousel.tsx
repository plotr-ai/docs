import React, { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './BlogCarousel.module.css';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  permalink: string;
  date: string;
}

interface BlogPluginData {
  blogs: {
    default: {
      items: BlogPost[];
    };
  };
}

export default function BlogCarousel(): JSX.Element {
  const blogPluginData = usePluginData('@docusaurus/preset-classic') as BlogPluginData;
  const posts = blogPluginData?.blogs?.default?.items || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === posts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [posts.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (!posts?.length) {
    return null;
  }

  return (
    <section className={styles.carouselContainer}>
      <div className={styles.carousel}>
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={clsx(styles.slide, {
              [styles.active]: index === currentIndex,
            })}
          >
            <Link to={post.permalink} className={styles.slideContent}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <span className={styles.date}>
                {new Date(post.date).toLocaleDateString()}
              </span>
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {posts.map((_, index) => (
          <button
            key={index}
            className={clsx(styles.dot, {
              [styles.activeDot]: index === currentIndex,
            })}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
} 