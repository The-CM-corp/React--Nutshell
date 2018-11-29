import React, { Component } from 'react'
import { Link } from "react-router-dom"
import APIManager from '../../modules/APIManager'
import "./News.css"
import "bootstrap/dist/css/bootstrap.min.css"

export default class NewsList extends Component {

    state = {
        users: [],
        news: []
    }

    componentDidMount(){
        const newState = {}

        this.props.getAllUsers()
        .then(users => newState.users = users)
        .then(() => APIManager.getAllEntries("news"))
        .then(news => newState.news = news)
        .then(() => this.setState(newState))
}

deleteNews = (id) => APIManager.deleteEntry("news", id)
    .then(() => APIManager.getAllEntries("news"))
    .then(news => this.setState({ news: news }))



render() {
    return (
        <section className="news list_title">
            {
                <article className="list_title">
                    <h1>News</h1>
                    <section className="locations">
                        {
                            this.state.news.map(newsArticle =>
                                <div key={newsArticle.id}>
                                    <h2>{newsArticle.title}</h2>
                                    <p>{newsArticle.synopsis}</p>
                                    <p><a href={`http://${newsArticle.url}`} target="new">{newsArticle.url}</a></p>
                                    <button className="btn" onClick={() => this.deleteNews(newsArticle.id)}>Delete</button>
                                    <Link className="nav-link" to={`/news/${newsArticle.id}`}>Details</Link>
                                </div>
                            )
                        }
                    </section>
                </article>

            }
        </section>
    )
}
}

