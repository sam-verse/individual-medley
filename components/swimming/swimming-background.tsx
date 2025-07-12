'use client'

import { FC } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the WaterBackground with no SSR to avoid window is not defined errors
const WaterBackground = dynamic<{ className?: string }>(
  () => import('./water-background').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-cyan-100" />
  }
)

const SwimmingBackground: FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <WaterBackground />
    </div>
  )
}

export default SwimmingBackground
