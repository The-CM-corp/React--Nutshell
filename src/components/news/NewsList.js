import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import timestamp from './timestamp'
import "./News.css"
import "bootstrap/dist/css/bootstrap.min.css"

export default class NewsList extends Component {

    state = {
        users: [],
        news: [],
        shownForm: null,
        hideNewForm: true,
        hideAddButton: false,
        hideAddForm: false,
        currentUserId: this.props.getCurrentUser(),
        editTitle: "",
        editSynopsis: "",
        editUrl: "",
        editId: "",
        editImage: "",
        userName: ""
    }


    componentDidMount() {
        APIManager.getAllEntries("news", `?user_id=${this.state.currentUserId}&_sort=timestamp&_order=desc`)
            .then((news) => {
                this.setState({ news: news })
            })

        APIManager.getEntry("users", this.state.currentUserId)
            .then((user) => {
            this.setState({ userName: user.name })
            })
    }

    deleteNews = (id) => APIManager.deleteEntry("news", id)
        .then(() => APIManager.getAllEntries("news", `?user_id=${this.state.currentUserId}&_sort=timestamp&_order=desc`))
        .then(news => this.setState({ news: news }))

    editNews = (id, editedNews) => APIManager.editEntry("news", id, editedNews)
        .then(() => APIManager.getAllEntries("news", `?user_id=${this.state.currentUserId}&_sort=timestamp&_order=desc`))
        .then(news => this.setState({ news: news }))


    addNews = (thing) => APIManager.addEntry("news", thing)
        .then(() => APIManager.getAllEntries("news", `?user_id=${this.state.currentUserId}&_sort=timestamp&_order=desc`))
        .then(news => this.setState({ news: news }))


    // Show and Hide "Edit News" form
    toggleEditForm = (id) => {
        if (this.state.shownForm === null) {
            this.setState({
                shownForm: id,
            });
        } else {
            this.setState({
                shownForm: null,
            });
        }
    }

    // Show and Hide "Add News" form
    toggleAddForm = () => {
        const currentState = this.state.hideAddForm;
        this.setState({
            hideAddForm: !currentState,
            hideAddButton: !currentState
        });
    }

    // Updates state in edit form
    handleNewClick = (editTitle, editSynopsis, editUrl, editId, editImage) => {
        this.setState({
            editTitle: editTitle,
            editSynopsis: editSynopsis,
            editUrl: editUrl,
            editId: editId,
            editImage: editImage,
        });
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Build new news article from "Add News" form inputs
    constructNewNews = evt => {
        const newNews = {
            title: this.state.title,
            synopsis: this.state.synopsis,
            url: this.state.url,
            image: this.state.image,
            timestamp: timestamp(),
            user_id: this.state.currentUserId
        }
        // Basic form validation
        if (this.state.title === undefined || this.state.title === "" ||
            this.state.synopsis === undefined || this.state.synopsis === "" ||
            this.state.image === undefined || this.state.image === "" ||
            this.state.url === undefined || this.state.url === "") {
            alert("You must complete all fields to add new article")
        } else {
        // if form is validated, then add new article and clear the state
            this.addNews(newNews)
                .then(this.setState({
                    title: "",
                    synopsis: "",
                    url: "",
                    image: ""
                }))
                .then(this.toggleAddForm())
        }
    }

    // Edit existing news article from "Edit News" form inputs
    constructEditedNews = evt => {
        evt.preventDefault();
        const editedNews = {
            title: this.state.editTitle,
            synopsis: this.state.editSynopsis,
            url: this.state.editUrl,
            image: this.state.editImage,
            timestamp: timestamp(),
            id: this.state.editId
        }
        // Basic form validation
        if (editedNews.title === undefined || editedNews.title === "" ||
            editedNews.synopsis === undefined || editedNews.synopsis === "" ||
            editedNews.image === undefined || editedNews.image === "" ||
            editedNews.url === undefined || editedNews.url === "") {
            alert("You must complete all fields to edit this article")
        } else {
        // if form is validated, then edit article and hide edit form
            this.editNews(editedNews.id, editedNews)
            this.toggleEditForm()
        }
    }


    render() {
        return (
            <section className="bryans__class">
                {
                    <article>
                        <h1>{this.state.userName}'s News</h1>
                        <div className={this.state.hideAddForm ? 'hide' : null}>
                            <button className="btn btn_mod" onClick={() => this.toggleAddForm()}>Add News Article</button>
                        </div>
                        <div id="addNews" className={this.state.hideAddForm ? null : 'hide'}>
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
                                <textarea id="synopsis" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Article Synopsis" aria-label="synopsis" aria-describedby="basic-addon1" value={this.state.synopsis || ''} />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Link URL</span>
                                </div>
                                <input id="url" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Link URL" aria-label="url" aria-describedby="basic-addon1" value={this.state.url || ''} />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Image URL</span>
                                </div>
                                <input id="image" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Image URL" aria-label="image" aria-describedby="basic-addon1" value={this.state.image || ''} />
                            </div>
                            <button className="btn btn_mod" onClick={() => {this.constructNewNews()}}> Submit</button>
                            <button className="btn btn_delete" onClick={() => this.toggleAddForm()}> Cancel</button>
                        </div>
                        <hr></hr>
                        <section className="news">
                            {
                                this.state.news.map(newsArticle =>
                                    <div className="news_card" key={newsArticle.id}>
                                        <h2>{newsArticle.title}</h2>
                                        <a href={`http://${newsArticle.url}`} target="new"><img src={newsArticle.image} className="news_image" alt={newsArticle.title}></img></a>
                                        <p>{newsArticle.synopsis}</p>
                                        <p><a href={`http://${newsArticle.url}`} target="new">{newsArticle.url}</a></p>
                                        <p className="oblique">{newsArticle.timestamp}</p>
                                        <div id="editDeleteBtns">
                                            <button className="btn btn_mod btn_small" onClick={() => {
                                                this.handleNewClick(newsArticle.title, newsArticle.synopsis, newsArticle.url, newsArticle.id, newsArticle.image)
                                                this.toggleEditForm(newsArticle.id)
                                            }}>Edit</button>
                                            <button className="btn btn_delete btn_small" onClick={() => this.deleteNews(newsArticle.id)}>Delete</button>
                                        </div>
                                        <div id="editForm" className={`${this.state.shownForm === newsArticle.id ? null : 'hide'}`}>
                                            <hr></hr>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1">Title</span></div>
                                                <input id="editTitle" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="" aria-label="editTitle" aria-describedby="basic-addon1" defaultValue={newsArticle.title} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1">Synopsis</span></div>
                                                <textarea id="editSynopsis" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Edit Synopsis" aria-label="editSynopsis" aria-describedby="basic-addon1" defaultValue={newsArticle.synopsis} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1">Image URL</span></div>
                                                <input id="editImage" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Edit Image URL" aria-label="image" aria-describedby="basic-addon1" defaultValue={newsArticle.image} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1">Link URL</span></div>
                                                <input id="editUrl" type="text" className="form-control" onChange={this.handleFieldChange} placeholder="Edit Link URL" aria-label="url" aria-describedby="basic-addon1" defaultValue={newsArticle.url} />
                                                <input id="editId" type="text" className="form-control hide" onChange={this.handleFieldChange} placeholder="Edit Id" aria-label="url" aria-describedby="basic-addon1" value={newsArticle.id} />
                                            </div>
                                            <button className="btn btn_mod btn_small" onClick={this.constructEditedNews}>Save Edited News</button>
                                            <button className="btn btn_delete btn_small" onClick={() => this.toggleEditForm(newsArticle.id)}>Cancel</button>
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

