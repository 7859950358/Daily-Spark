import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
// import NewsItem from './components/NewsItem'

export class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <News />
        {/* <NewsItem /> */}
      </>
    )
  }
}

export default App
