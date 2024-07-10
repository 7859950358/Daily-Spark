import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
// import NewsItem from './components/NewsItem'
import './App.css'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Aboutus from './components/Aboutus'

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
    }
  }

  toggleMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }))
  }

  render() {
    const { isDarkMode } = this.state;
    const themeClass = isDarkMode ? 'dark-mode' : 'light-mode';
    return (
      <>
        <Router>
          <div className={`app ${themeClass}`}>
            <NavBar toggleMode={this.toggleMode}/>
            <Routes>
              <Route path='/' element={<News key="general" pageSize={6} country={"in"} category={"general"} />} />
              <Route path='/business' element={<News key="business" pageSize={6} country={"in"} category={"business"} />} />
              <Route path='/entertainment' element={<News key="entertainment" pageSize={6} country={"in"} category={"entertainment"} />} />
              <Route path='/health' element={<News key="health" pageSize={6} country={"in"} category={"health"} />} />
              <Route path='/science' element={<News key="science" pageSize={6} country={"in"} category={"science"} />} />
              <Route path='/sports' element={<News key="sports" pageSize={6} country={"in"} category={"sports"} />} />
              <Route path='/technology' element={<News key="technology" pageSize={6} country={"in"} category={"technology"} />} />
              <Route path='/Aboutus' element={<Aboutus />}></Route>
            </Routes>
          </div>
        </Router>
      </>
    )
  }
}

export default App
