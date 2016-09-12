import React, {Component, PropTypes} from 'react';
import Button from '../button';

class UrlForm extends Component {
  submit() {
    const val = this.refs.input.value;
    this.props.onSubmit(val);
    this.refs.input.value = '';
  }

  render() {
    const { props } = this;

    return (
      <div>
        <div className="mb1">
          <p className="h3 col-7 inline bg-silver p1">{props.url}</p>
          <input className="h3 p1 col-5"
            ref="input"
            type="text"
            placeholder={props.placeholder}/>
        </div>
        <Button onClick={this.submit.bind(this)}>GET</Button>
      </div>
    );
  }
}

UrlForm.propTypes = {
  url: PropTypes.string,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default UrlForm;
