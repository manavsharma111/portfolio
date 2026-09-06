import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import TechMarquee from '../components/Home/TechMarquee'
import FeaturedProjects from '../components/Home/FeaturedProjects'
import Stats from '../components/Home/Stats'
import CTA from '../components/Home/CTA'
import AboutPage from './AboutPage'
import AchievementsPage from './AchievementsPage'
import ContactPage from './ContactPage'
import { Helmet } from 'react-helmet-async'
import NextPageFooter from '../components/Shared/NextPageFooter'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      // Wait for view transition (1.2s) + render, then scroll
      const timer = setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [location.state])
  return (
    <main className="w-full min-h-screen">
      <Helmet>
        <title>Manav Sharma — MERN Stack Developer & Backend Engineer</title>
        <meta name="description" content="3rd-year ECE student at NIT Bhopal. Full-stack developer specializing in backend systems, self-hosted platforms, and immersive web experiences." />
      </Helmet>
      <Hero />
      <TechMarquee />
      <FeaturedProjects />
      <Stats />
      <CTA />
      <AboutPage />
      <AchievementsPage />
      <ContactPage />
      <NextPageFooter
        title="Skills"
        subtitle="Explore My Tech Stack"
        url="/skills"
        accentColor="#00d9ff"
        image="/page image/skills.png"
        mobileImage="/page image/skill_phone.png"
      />
    </main>
  )
}
