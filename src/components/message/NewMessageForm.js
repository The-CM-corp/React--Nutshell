import React, { Component } from "react"
export default class NewMessageForm extends Component {

  render() {
    return (
      <div className="new__message">
        <button type="button"
          className={this.props.hideNewForm ? "btn btn_mod" : 'hide'}
          id="new__button "
          onClick={() => {
            this.props.handleNewClick()
          }}
        >
          New Message
          </button>
        <div className={this.props.hideNewForm ? 'hide' : null} id="new__message__form">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Message</span>
            </div>
            <input type="text" className="form-control" id="message" placeholder="New Message" aria-label="Username" aria-describedby="basic-addon1" onChange={this.props.handleFieldChange} />
          </div>
          <div className="button__holder">
            <button
              className="btn cancel__button btn_delete"
              onClick={() => {
                this.props.handleNewClick()
              }}>
              Cancel
            </button>
            <button
              className="btn btn_mod"
              onClick={() => {
                this.props.constructNewMessage()
                this.props.handleNewClick()
              }}>
              Submit
            </button>

          </div>
        </div>
      </div>
    )
  }
}
