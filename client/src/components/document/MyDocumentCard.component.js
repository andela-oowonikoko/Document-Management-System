import React from 'react';
import { Modal, Button, Row, Input } from 'react-materialize';

/**
 * @class MyDocumentCard
 * @extends {React.Component}
 */
class MyDocumentCard extends React.Component {
  /**
   * Creates an instance of MyDocumentCard.
   * @param {any} props
   * @memberOf MyDocumentCard
   */
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      content: '',
      access: '',
      ownerId: '',
      ownerRoleId: ''
    };
  }

  /**
   * @param {any} event
   * @returns {object} object
   * @memberOf MyDocumentCard
   */
  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf MyDocumentCard
   */
  onSubmit(event) {
    event.preventDefault();
    const id = event.target.id.value;
    const title = event.target.title.value;
    const access = event.target.access.value;
    const content = event.target.content.value;
    const documentDetails = { id, title, access, content };

    this.props.updateDocument(documentDetails).then((res) => {
      this.context.router.history.push('/app/mydocument');
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 4000, 'rounded');
    });
  }

  /**
   * @returns {void}
   * @memberOf DocumentCard
   */
  render() {
    return (
      <div className="col s4">
        <div className="card qBox">
          <div className="card-content white-text">
            <span className="card-title">{this.props.document.title}</span>
            <p>{this.props.document.content}</p>
          </div>
          <div className="card-action">
            <div className="documentDate">
              <span className="documentSpan">
                Published:
                { (this.props.document.createdAt) ?
                this.props.document.createdAt.split('T')[0] : ''}
              </span>
              <span className="documentSpan">
                Access:
                { this.props.document.access }
              </span>
            </div>
            {this.props.currentUser.userId ===
            this.props.document.ownerId && <Modal
              header="Edit Document"
              trigger={
                <Button
                  waves="light"
                  className="btn-floating blue darken-4 right"
                >
                  <i className="material-icons">mode_edit</i>
                </Button>}
            >
              <form
                className="col s12"
                method="post"
                onSubmit={e => this.onSubmit(e)}
              >
                <Row>
                  <Input
                    s={6}
                    value="DOC ID"
                  />
                  <Input
                    s={6}
                    name="id"
                    value={this.props.document.id}
                  />
                </Row>
                <Row>
                  <Input
                    s={6}
                    name="title"
                    value={this.state.title === '' ?
                    this.props.document.title : this.state.title}
                    onChange={e => this.onChange(e)}
                  />
                  <Input
                    s={6}
                    validate
                    type="select"
                    name="access"
                    onChange={e => this.onChange(e)}
                    value={this.state.access === '' ?
                    this.props.document.access : this.state.access}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </Input>
                </Row>
                <Row>
                  <textarea
                    name="content"
                    value={this.state.content === '' ?
                    this.props.document.content : this.state.content}
                    onChange={e => this.onChange(e)}
                    label="Content"
                    className="materialize-textarea"
                  />
                </Row>
                <Button className="teal lighten-2" waves="light" type="submit">
                  UPDATE
                </Button>
              </form>
            </Modal>}
            {this.props.currentUser.userId ===
            this.props.document.ownerId && <Button
              waves="light"
              onClick={() => this.props.deleteDocument(this.props.document.id)}
              className="btn-floating red darken-2 right"
            >
              <i className="material-icons">delete</i>
            </Button>}
          </div>
        </div>
      </div>
    );
  }
}

MyDocumentCard.propTypes = {
  document: React.PropTypes.object.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  updateDocument: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired
};

MyDocumentCard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default MyDocumentCard;
