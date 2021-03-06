import React, { Component } from 'react';
import PropTypes from 'prop-types';
import paginator from 'paginator';
import { connect } from 'react-redux';
import Page from './Page';
import * as actions from '../actions/';

class Pagination extends Component {
  static propTypes = {
    totalItemsCount: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    activePage: PropTypes.number,
    itemsCountPerPage: PropTypes.number,
    pageRangeDisplayed: PropTypes.number,
    prevPageText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    nextPageText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    lastPageText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    firstPageText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    innerClass: PropTypes.string,
    itemClass: PropTypes.string,
    linkClass: PropTypes.string,
    activeClass: PropTypes.string,
    activeLinkClass: PropTypes.string,
    disabledClass: PropTypes.string,
    hideDisabled: PropTypes.bool,
    hideNavigation: PropTypes.bool,
  }

  static defaultProps = {
    itemsCountPerPage: 10,
    pageRangeDisplayed: 5,
    activePage: 1,
    prevPageText: '⟨',
    firstPageText: '«',
    nextPageText: '⟩',
    lastPageText: '»',
    innerClass: 'pagination',
    itemClass: undefined,
    linkClass: undefined,
    activeLinkClass: undefined,
  }

  buildPages () {
    const pages = [];
    const {
        itemsCountPerPage,
        pageRangeDisplayed,
        activePage,
        prevPageText,
        nextPageText,
        firstPageText,
        lastPageText,
        totalItemsCount,
        onChange,
        activeClass,
        itemClass,
        linkClass,
        activeLinkClass,
        disabledClass,
        hideDisabled,
        hideNavigation,
    } = this.props;

    const paginationInfo = new paginator(itemsCountPerPage, pageRangeDisplayed)
        .build(totalItemsCount, activePage);

    if (paginationInfo.first_page !== paginationInfo.last_page) {
      for (let i = paginationInfo.first_page; i <= paginationInfo.last_page; i++) {
        pages.push(
          <Page
            isActive={i === activePage}
            key={i}
            pageNumber={i}
            pageText={`${i}`}
            onClick={onChange}
            itemClass={itemClass}
            linkClass={linkClass}
            activeClass={activeClass}
            activeLinkClass={activeLinkClass} />
        );
      }
    }

    ((hideDisabled && !paginationInfo.has_previous_page) || hideNavigation) || pages.unshift(
      <Page
        key={`prev${paginationInfo.previous_page}`}
        pageNumber={paginationInfo.previous_page}
        onClick={onChange}
        pageText={prevPageText}
        isDisabled={!paginationInfo.has_previous_page}
        itemClass={itemClass}
        linkClass={linkClass}
        disabledClass={disabledClass} />
      );

    ((hideDisabled && !paginationInfo.has_previous_page) || hideNavigation) || pages.unshift(
      <Page
        key={'first'}
        pageNumber={1}
        onClick={onChange}
        pageText={firstPageText}
        isDisabled={paginationInfo.current_page === paginationInfo.first_page}
        itemClass={itemClass}
        linkClass={linkClass}
        disabledClass={disabledClass} />
      );

    ((hideDisabled && !paginationInfo.has_next_page) || hideNavigation) || pages.push(
      <Page
        key={`next${paginationInfo.next_page}`}
        pageNumber={paginationInfo.next_page}
        onClick={onChange}
        pageText={nextPageText}
        isDisabled={!paginationInfo.has_next_page}
        itemClass={itemClass}
        linkClass={linkClass}
        disabledClass={disabledClass} />
      );

    ((hideDisabled && !paginationInfo.has_next_page) || hideNavigation) || pages.push(
      <Page
        key={'last'}
        pageNumber={paginationInfo.total_pages}
        onClick={onChange}
        pageText={lastPageText}
        isDisabled={paginationInfo.current_page === paginationInfo.total_pages}
        itemClass={itemClass}
        linkClass={linkClass}
        disabledClass={disabledClass} />
      );

    return pages;
  }

  render () {
    const pages = this.buildPages();
    return (
      <ul className={this.props.innerClass}>{pages}</ul>
    );
  }
}
export default connect(state => state, actions)(Pagination);