import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader'

export class News extends Component {

    constructor() {
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f044c2f986b848c886f53e587756e0c5&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });

    }

    handlePreviousPage = async () => {
        console.log("Previous");
        console.log("Next");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f044c2f986b848c886f53e587756e0c5&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        });
    }

    handleNextPage = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f044c2f986b848c886f53e587756e0c5&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
            this.setState({ loading: true })
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1
            });
        }

    }

    render() {
        return (
            <div className='container'>
                <h1>Today's Top Headlines</h1>
                {this.state.loading && <Loader />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className='d-flex justify-content-between my-5'>
                    <button type="button" className="btn btn-outline-dark" disabled={this.state.page <= 1} onClick={this.handlePreviousPage}>&larr; Previous</button>
                    <button type="button" className="btn btn-outline-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.page)} onClick={this.handleNextPage}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
