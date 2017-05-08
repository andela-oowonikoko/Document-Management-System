import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';

// Require Editor JS files.
require('froala-editor/js/froala_editor.pkgd.min.js');

// Require Editor CSS files.
require('froala-editor/css/froala_style.min.css');
require('froala-editor/css/froala_editor.pkgd.min.css');

// Require Font Awesome.
// require('font-awesome/css/font-awesome.css');

let FroalaEditor = require('react-froala-wysiwyg');

/**
 * @class CreateDocument
 * @extends {Component}
 */
class CreateDocument extends Component {
  /**
   * Creates an instance of CreateDocument.
   * @param {any} props
   * @memberOf CreateDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: 'public'
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf CreateDocument
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf CreateDocument
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.saveDocument(this.state).then((res) => {
      this.context.router.history.push('/app/mydocument').then(() => {
        Materialize.toast(res.data.message, 4000, 'rounded');
      });
    }).catch((err) => {
      Materialize.toast(err.response.data.message, 4000, 'rounded');
    });
  }

  /**
   * @param {object} content
   * @memberof DocumentCreateForm
   * @returns {void}
   */
  handleModelChange(content) {
    this.setState({ content });
  }

  /**
   * renders the CreateDocument component
   * @returns {void}
   * @memberOf CreateDocument
   */
  render() {
    return (
      <div>
        <div className="row btnViewDocuments">
          <Link className="btn create-list-link hero-btn" to="/app/mydocument">
            View Documents
          </Link>
        </div>
        <form onSubmit={this.onSubmit}>
          <h5>Create a Document </h5>
          <Row>
            <Input
              placeholder="Title"
              s={12}
              validate
              name="title"
              onChange={this.onChange}
              value={this.state.title}
              required
            />
            {/*<Input
              placeholder="Content"
              s={12}
              validate
              type="textarea"
              name="content"
              onChange={this.onChange}
              value={this.state.content}
              required
            />*/}
            <Input
              s={12}
              validate
              type="select"
              name="access"
              onChange={this.onChange}
              value={this.state.access}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </Input>
          </Row>
          <FroalaEditor
            validate
            tag="textarea"
            config={this.config}
            model={this.state.model}
            onModelChange={this.handleModelChange}
          />
          <Input
            type="submit"
            value="Save"
            className="btn waves-effect waves-light"
          />
        </form>
      </div>
    );
  }
}

CreateDocument.propTypes = {
  saveDocument: React.PropTypes.func.isRequired
};

CreateDocument.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default CreateDocument;
