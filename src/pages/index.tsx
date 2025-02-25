import React, { JSX } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import BlogCarousel from '@site/src/components/BlogCarousel'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Heading from '@theme/Heading'
import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  const heroImage = useBaseUrl('/img/hero.png')

  return (
    <header
      className={clsx('hero', styles.heroBanner)}
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className={styles.heroOverlay} />
      <div className="container">
        <Heading as="h1" className="hero__title">
          plotr.ai
        </Heading>
        <p className="hero__subtitle">
          Transform your business with agentic AI.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <BlogCarousel />
      </main>
    </Layout>
  )
}
