import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import * as actions from '../actions/';
import { connect } from 'react-redux';

class PaginationLinks extends Component {
  static propTypes = {
    setActivePage: PropTypes.func,
    activePage: PropTypes.number,
    page: PropTypes.object,
  }

  handlePageChange (pageNumber) {
    console.log(`active page is ${pageNumber}`);
    /* set active page */
    this.props.setActivePage(pageNumber);
  }

  render () {
    const { activePage, page } = this.props;

    return (
      <div className="paginationLinks">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={page.size}
          totalItemsCount={page.totalElements}
          pageRangeDisplayed={4}
          onChange={::this.handlePageChange} />
      </div>);
  }
}

export default connect(state => state, actions)(PaginationLinks);
