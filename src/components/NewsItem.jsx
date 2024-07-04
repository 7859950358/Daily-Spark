import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl}=this.props;
        return (
            <div className='container'>
                <div class="card" style={{width: "18rem"}}>
                    <img src={imageUrl ? imageUrl : "https://play-lh.googleusercontent.com/XKpIJApesGkiUv5uDoybpeq3-EAh53KYGRvxheJes7F0x0Qn_Bfqm7RI9jKoexo7UE8=w240-h480-rw"} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">{title}....</h5>
                        <p class="card-text">{description}....</p>
                        <a href={newsUrl} target='_blank' class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
