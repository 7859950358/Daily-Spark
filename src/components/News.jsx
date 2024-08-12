import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Loder from './Loder'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    constructor() {
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
    }

    capitallizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async UpdateNews(pageNo) {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=f044c2f986b848c886f53e587756e0c5&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${pageNo}`;
        this.setState({ loading: true });
        this.props.setProgress(30)
        let data = await fetch(url);
        this.props.setProgress(70)
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100)
        document.title = `${this.capitallizeFirstLetter(this.props.category)} - Daily Spark`
    }
    async componentDidMount () {
        this.UpdateNews(this.state.page)
    }

    // handlePreviousPage = async () => {
    //     console.log("Previous");
    //     this.setState({ page: this.state.page - 1 },
    //         () => { this.UpdateNews(this.state.page) })
    // }

    // handleNextPage = async () => {
    //     console.log("Next");
    //     this.setState({ page: this.state.page + 1 },
    //         () => { this.UpdateNews(this.state.page) })
    // }

    fetchMoreData = async (pageNo) => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=f044c2f986b848c886f53e587756e0c5&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${pageNo}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles.concat(this.state.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
    };

    render() {
        return (
            <div className='container news-headline'>
                {/* This Is News Components */}
                <h1 className='text-center'>Today's Top Headlines About - {this.capitallizeFirstLetter(this.props.category)}</h1>
                {/* {this.state.loading && <Loder />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                >
                    <div className='container'>
                        <div className="row my-3">
                            {this.state.articles.map(
                                (element) => {
                                    return (
                                        <div className="col-md-4" key={element.url}>
                                            <NewsItem title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="d-flex justify-content-between my-4">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-outline-dark" onClick={this.handlePreviousPage}>&larr; Previous</button>
                    <button type="button" className="btn btn-outline-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.page)} onClick={this.handleNextPage}>Next &rarr;</button>
                </div> */}
            </div>
        );
    }
}

export default News