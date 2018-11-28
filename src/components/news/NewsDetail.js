import React, { Component } from "react"

export default class NewsDetail extends Component {
    render() {
        const news = this.props.news.find(a => a.id === parseInt(this.props.match.params.newsId)) || {}

        return (
            <section className="news list_title">
                <div key={news.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            {news.title}
                        </h4>
                        <a href="#"
                            onClick={() => this.props.deleteEntry("news", news.id)
                                .then(() => this.props.history.push("/news"))}
                            className="card-link">Delete</a>
                    </div>
                </div>
            </section>
        )
    }
}