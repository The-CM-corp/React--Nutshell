import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import timestamp from './timestamp'
import "./News.css"
import "bootstrap/dist/css/bootstrap.min.css"

export default class NewsList extends Component {

    state = {
        users: [],
        news: []
    }

    componentDidMount() {
        const newState = {}

        this.props.getAllUsers()
            .then(users => newState.users = users)
            .then(() => APIManager.getAllEntries("news", "?_sort=timestamp", "&_order=asc"))
            .then(news => newState.news = news)
            .then(() => this.setState(newState))
    }

    deleteNews = (id) => APIManager.deleteEntry("news", id)
        .then(() => APIManager.getAllEntries("news"))
        .then(news => this.setState({ news: news }))

    editNews = (id) => APIManager.editEntry("news", id)
        .then(() => APIManager.getAllEntries("news"))
        .then(news => this.setState({ news: news }))


    addNews = (thing) => APIManager.addEntry("news", thing)
        .then(() => APIManager.getAllEntries("news"))
        .then(news => this.setState({ news: news }))



    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
        console.log(stateToChange)
    }


    /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
    constructNewNews = evt => {
        evt.preventDefault();
        const newNews = {
            title: this.state.title,
            synopsis: this.state.synopsis,
            url: this.state.url,
            timestamp: timestamp()
        }

        this.addNews(newNews)
        .then(this.setState({
            title: "",
            synopsis: "",
            url: ""
        }))
    }





    render() {
        return (
            <section className="bryans__class">
                {
                    <article className="list_title">
                        <h1>News</h1>
                        <div id="addNews">
                            <p>Add News</p>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Title</span>
                                </div>
                                <input id="title" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Article Title" aria-label="title" aria-describedby="basic-addon1" value={this.state.title} />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Synopsis</span>
                                </div>
                                <input id="synopsis" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Article Synopsis" aria-label="synopsis" aria-describedby="basic-addon1" value={this.state.synopsis}/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Link URL</span>
                                </div>
                                <input id="url" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Link URL" aria-label="url" aria-describedby="basic-addon1" value={this.state.url}/>
                            </div>
                            <button className="btn btn_mod" onClick={this.constructNewNews}>Add News</button>
                        </div>
                        <section className="news">
                            {
                                this.state.news.map(newsArticle =>
                                    <div className="news_card" key={newsArticle.id}>
                                        <h2>{newsArticle.title}</h2>
                                        <p>{newsArticle.synopsis}</p>
                                        <p><a href={`http://${newsArticle.url}`} target="new">{newsArticle.url}</a></p>
                                        <p>{newsArticle.timestamp}</p>
                                        <button className="btn btn_mod" onClick={() => this.editNews(newsArticle.id)}>Edit</button>
                                        <button className="btn btn_mod" onClick={() => this.deleteNews(newsArticle.id)}>Delete</button>
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

