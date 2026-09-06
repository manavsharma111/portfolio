import { useParams, Navigate } from 'react-router-dom'
import { projects } from '../components/Projects/ProjectData'
import ProjectPage from '../components/Projects/ProjectPage'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  
  const projectIndex = projects.findIndex(p => p.slug === slug)
  const project = projects[projectIndex]

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0)
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    }
  }, [slug])

  if (!project) {
    return <Navigate to="/404" replace />
  }

  const titles = {
    'nexforge': 'NexForge — Self-Hosted PaaS | Manav Sharma',
    'anime-stream': 'Anime Stream — HLS Video Platform | Manav Sharma',
    'crochella': 'Crochella — 3D E-Commerce | Manav Sharma',
    'wolf': 'Wolf — Social Media Platform | Manav Sharma'
  }

  return (
    <>
      <Helmet>
        <title>{titles[project.slug] || `${project.name} | Manav Sharma`}</title>
        <meta name="description" content={project.tagline} />
      </Helmet>
      <ProjectPage project={project} projectIndex={projectIndex} />
    </>
  )
}
