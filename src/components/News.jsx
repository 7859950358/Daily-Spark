import React, { Component } from 'react'
import Newsitem from './Newsitem'
import InfiniteScroll from "react-infinite-scroll-component";
// import Loader from './Loader';
export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async UpdateNews(pageNo) {
        this.props.setProgress(10);
        let url = https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=5f67567f06194be98a252c8d00396307&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${PageNo};
        this.setState({ loading: true });
        this.props.setProgress(30);
        let data = await fetch(url);
        this.props.setProgress(70);

        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
        });
        this.props.setProgress(100);
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Daily spark`
    }

    async componentDidMount() {
        this.UpdateNews(this.state.page);

    };


    handlePreviousPage = async () => {
        console.log("Previous");
        this.setState(
            { page: this.state.page - 1 },
            () => { this.UpdateNews(this.state.page) }
        )
    }

    handleNextPage = async () => {
        console.log("Next");
        this.setState(
            { page: this.state.page + 1 },
            () => { this.UpdateNews(this.state.page) }

        )


    }

    fetchMoreData = async (PageNo) => {
        this.setState({ page: this.state.page + 1 });
        let url = https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=5f67567f06194be98a252c8d00396307&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${PageNo};

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles.concat(this.state.articles),
            totalResults: parsedData.totalResults,
        });
    };

    render() {
        return (
            <div className='container news-headline'>
                <h1>Today's Top Headlines about - {this.capitalizeFirstLetter(this.props.category)}	</h1>
                {/* {this.state.loading && <Loader />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map(
                                (element) => {
                                    return <div className="col-md-4" key={element.url}>
                                        <Newsitem title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name

                                        } />

                                    </div>
                                }
                            )}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='d-flex justify-content-between my-3'>
          <button type="button" disabled={this.props.state + 1 > Math.ceil(this.state.totalResults / 20)} className="btn btn-outline-dark" onClick={this.handlePreviousPage}>Previous &larr;</button>
          <button type="button" className="btn btn-outline-dark" onClick={this.handleNextPage}>Next &rarr;</button>
        </div> */}

            </div>
        )
    }
}