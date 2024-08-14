import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
// import NewsItem from './components/NewsItem'
import './App.css'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Aboutus from './components/Aboutus'
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  static defaultProps = {
    pageSize: 6,
    country: "us",
    category: "science"
  }
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      isDarkMode: false,
      apiKey: process.env.REACT_APP_API_KEY,
    }
  }

  toggleMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
      progress: 0
    }))
  }

  setProgress = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    const { isDarkMode } = this.state;
    // const { isLightMode } = this.state;
    const themeClass = isDarkMode ? 'dark-mode' : 'light-mode';

    return (
      <>
        <Router>
          <div className={`app ${themeClass}`}>
            <NavBar toggleMode={this.toggleMode} />
            <LoadingBar
              color='#f11946'
              progress={this.state.progress}
            />
            <Routes>
              <Route path='/' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key="general" pageSize={6} country={"in"} category={"general"} />} />
              <Route path='/business' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key="business" pageSize={6} country={"in"} category={"business"} />} />
              <Route path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key="entertainment" pageSize={6} country={"in"} category={"entertainment"} />} />
              <Route path='/health' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key="health" pageSize={6} country={"in"} category={"health"} />} />
              <Route path='/science' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key="science" pageSize={6} country={"in"} category={"science"} />} />
              <Route path='/sports' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key="sports" pageSize={6} country={"in"} category={"sports"} />} />
              <Route path='/technology' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key="technology" pageSize={6} country={"in"} category={"technology"} />} />
              <Route path='/Aboutus' element={<Aboutus />}></Route>
            </Routes>
          </div>
        </Router>
      </>
    )
  }
}

export default App
