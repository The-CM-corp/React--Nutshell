import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import "../../index.css"

export default class MessageEditForm extends Component {
 
 

  render() {
    return(
      <Form className={this.props.hideEditForm ? 'hide' : null}>
        <FormGroup>
          <Label for="Message">Edit Your Message</Label>
          <Input type="text" name="message" id="mesage" placeholder={this.props.message.message} value ={this.props.message.message}/>
        </FormGroup>
        <Button>Submit</Button>
        </Form>

    )
  }
}