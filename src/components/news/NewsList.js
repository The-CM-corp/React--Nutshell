import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import timestamp from './timestamp'
import "./News.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Collapse } from 'react-bootstrap'

export default class NewsList extends Component {

    state = {
        users: [],
        news: [],
        hideNewForm: true,
        hideAddForm: true,
        currentUserId: "",
        editTitle: "",
        editSynopsis: "",
        editUrl: "",
        editId: "",
    }

    // getUserId() {
    //     // const currentUser = localStorage.getItem("userId") || sessionStorage.getItem("userId")
    //     const sesStor = sessionStorage.getItem("userId")
    //     //  if(locStor !== "null"){
    //     this.setState({ userId: sesStor })
    //     //  } else if(sesStor !== "null"){
    //     // this.setState({userId: sesStor})
    //     //  }
    //     console.log("sesStor: ", sesStor)
    // }


    componentDidMount() {
        const newState = {}

        this.props.getAllUsers()
            .then(users => newState.users = users)
            .then(() => APIManager.getAllEntries("news", `?_user_id=${this.state.userId}`, "&_sort=timestamp", "&_order=asc"))
            .then(news => newState.news = news)
            .then(() => this.setState(newState))
    }

    deleteNews = (id) => APIManager.deleteEntry("news", id)
        .then(() => APIManager.getAllEntries("news"))
        .then(news => this.setState({ news: news }))

    editNews = (id, editedNews) => APIManager.editEntry("news", id, editedNews)
        .then(() => APIManager.getAllEntries("news"))
        .then(news => this.setState({ news: news }))


    addNews = (thing) => APIManager.addEntry("news", thing)
        .then(() => APIManager.getAllEntries("news"))
        .then(news => this.setState({ news: news }))


    toggleEditForm = () => {
        const currentState = this.state.hideNewForm;
        this.setState({
            hideNewForm: !currentState,
        });
    }

    toggleAddForm = () => {
        const currentState = this.state.hideAddForm;
        this.setState({
            hideAddForm: !currentState,
        });
    }


    handleNewClick = (editTitle, editSynopsis, editUrl, editId) => {
        this.setState({
            editTitle: editTitle,
            editSynopsis: editSynopsis,
            editUrl: editUrl,
            editId: editId
        });
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }



    /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
    constructNewNews = evt => {
        evt.preventDefault();
        this.getUserId();
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


    constructEditedNews = evt => {
        // this.getUserId();
        evt.preventDefault();
        const editedNews = {
            title: this.state.editTitle,
            synopsis: this.state.editSynopsis,
            url: this.state.editUrl,
            timestamp: timestamp(),
            id: this.state.editId
        }
        // console.log("Edited News:", editedNews)
        // console.log("SessionId: ", this.state.userId)

        this.editNews(editedNews.id, editedNews)
    }





    render() {
        return (
            <section className="bryans__class">
                {
                    <article className="list_title">
                        <h1>News</h1>
                        <button className="btn btn_mod" onClick={() => this.toggleAddForm()}>Add News Article</button>
                        <div id="addNews" className={this.state.hideAddForm ? 'hide' : null}>
                            <hr></hr>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Title</span>
                                </div>
                                <input id="title" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Article Title" aria-label="title" aria-describedby="basic-addon1" value={this.state.title || ''} />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Synopsis</span>
                                </div>
                                <input id="synopsis" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Article Synopsis" aria-label="synopsis" aria-describedby="basic-addon1" value={this.state.synopsis || ''} />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Link URL</span>
                                </div>
                                <input id="url" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Link URL" aria-label="url" aria-describedby="basic-addon1" value={this.state.url || ''} />
                            </div>
                            <button className="btn btn_mod" onClick={this.constructNewNews}>Add News</button>
                        </div>
                        <hr></hr>
                        <section className="news">
                            {
                                this.state.news.map(newsArticle =>
                                    <div className="news_card" key={newsArticle.id}>
                                        <h2>{newsArticle.title}</h2>
                                        <p>{newsArticle.synopsis}</p>
                                        <p><a href={`http://${newsArticle.url}`} target="new">{newsArticle.url}</a></p>
                                        <p>{newsArticle.timestamp}</p>
                                        <button className="btn btn_mod" onClick={() => {
                                            this.handleNewClick(newsArticle.title, newsArticle.synopsis, newsArticle.url, newsArticle.id)
                                            this.toggleEditForm()
                                        }}>Edit</button>
                                        <button className="btn btn_mod" onClick={() => this.deleteNews(newsArticle.id)}>Delete</button>
                                        <div id="editForm" className={this.state.hideNewForm ? 'hide' : null}>edit form
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1">Title</span></div>
                                                <input id="editTitle" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="" aria-label="editTitle" aria-describedby="basic-addon1" defaultValue={newsArticle.title} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1">Synopsis</span></div>
                                                <input id="editSynopsis" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Edit Synopsis" aria-label="editSynopsis" aria-describedby="basic-addon1" defaultValue={newsArticle.synopsis} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1">Link URL</span></div>
                                                <input id="editUrl" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Edit Link URL" aria-label="url" aria-describedby="basic-addon1" defaultValue={newsArticle.url} />
                                                <input id="editId" type="text" className="form-control hide" onChange={this.handleFieldChange} placeholder="Edit Id" aria-label="url" aria-describedby="basic-addon1" value={newsArticle.id} />
                                            </div>
                                            <button className="btn btn_mod" onClick={this.constructEditedNews}>Save Edited News</button>
                                        </div>
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

