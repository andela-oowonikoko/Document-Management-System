import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class CreateDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: 'public'
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.saveDocument(this.state).then((res) => {
      this.context.router.history.push('/app/document');
    }).catch((err) => {
      swal({
        title: 'Error!',
        text: err.response.data.message,
        type: 'error',
        confirmButtonColor: '#18aa8d',
        confirmButtonText: 'Ok',
        closeOnConfirm: false,
        html: false
      });
    });
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
          <Link className="btn create-list-link hero-btn" to="/app/document">
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
            <Input 
              placeholder="Content"
              s={12}
              validate
              type="textarea"
              name="content"
              onChange={this.onChange}
              value={this.state.content}
              required
            />
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
              <option value="role">Role</option>
            </Input>

            <Input
              type="submit"
              value="Save"
              className="btn waves-effect waves-light"
            />
          </Row>
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
