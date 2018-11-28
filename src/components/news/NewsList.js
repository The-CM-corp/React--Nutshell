import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "./News.css"

export default class NewsList extends Component {
    render() {
        return (
            <section className="news list_title">
                {
                    <article className="list_title">
                        <h1>News</h1>
                        <section className="locations">
                            {
                                this.props.news.map(newsArticle =>
                                    <div key={newsArticle.id}>
                                        <h2>{newsArticle.title}</h2>
                                        <p>{newsArticle.synopsis}</p>
                                        <p><a href={`http://${newsArticle.url}`} target="new">{newsArticle.url}</a></p>
                                <a href="#" onClick={() => this.props.deleteEntry(newsArticle.id)}
                                            className="card-link">Delete</a>
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

