import { Component } from 'react'
import HeroCharacterFallback from './HeroCharacterFallback'

export class CharacterErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return <HeroCharacterFallback />
    return this.props.children
  }
}
