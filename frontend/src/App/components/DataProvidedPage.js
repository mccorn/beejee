/* eslint-disable react/no-unused-state */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { loadPageData } from './functions';

class DataProvidedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPageData: null,
      error: null,
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const { match } = this.props;
    const { currentPageData } = this.state;
    if (match && currentPageData === null) {
      this.loadFormData(DataProvidedPage.getDataPath(match));
    }
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (match && this.isNeedToReloadData(prevProps)) {
      this.loadFormData(DataProvidedPage.getDataPath(match));
    }
  }

  static getDataPath(match) {
    return match.url || '/';
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setFormData(data) {
    const state = this.componentWillReceiveData(data) || {};
    if (!this._isMounted) {
      return;
    }
    this.setState({
      ...state,
      currentPageData: data,
      error: null,
    });
  }

  componentWillReceiveData(nextData) { // eslint-disable-line no-unused-vars, class-methods-use-this
    // nop
  }

  loadFormData(data) {
    loadPageData(data).then(
      (data) => this.setFormData(data),
      (error) => this.setState({ error, currentPageData: null }),
    );
  }

  isNeedToReloadData(prevProps) {
    const { location } = this.props;
    const locationChanged = location && location.key !== prevProps.location.key;
    return locationChanged;
  }
}

DataProvidedPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
};

DataProvidedPage.defaultProps = {
  match: null,
  location: null,
};

export default DataProvidedPage;
