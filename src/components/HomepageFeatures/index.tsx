import React, { JSX } from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

type FeatureItem = {
  title: string
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Dynamic Graph-Based AI Orchestration',
    description: (
      <>
        Advanced graph architecture enabling dynamic agent interactions, cyclic paths, 
        and iterative refinement. Flexible workflows support feedback loops and 
        adaptive decision-making for complex AI tasks.
      </>
    ),
  },
  {
    title: 'No-Code AI Workflow Builder',
    description: (
      <>
        Intuitive drag-and-drop interface for visually assembling AI workflows. Rich marketplace 
        of pre-built agents, tools, and connectors enables rapid development without coding.
      </>
    ),
  },
  {
    title: 'Enterprise-Grade Observability',
    description: (
      <>
        Comprehensive diagnostics dashboard with visual execution tracing, performance metrics, 
        and audit trails. Deep visibility into every workflow invocation for debugging and optimization.
      </>
    ),
  },
]

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
