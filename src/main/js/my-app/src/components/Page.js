import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Page extends Component {
  static propTypes = {
    pageText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    pageNumber: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
    activeClass: PropTypes.string,
    activeLinkClass: PropTypes.string,
    itemClass: PropTypes.string,
    linkClass: PropTypes.string,
    disabledClass: PropTypes.string,
  }

  static defaultProps = {
    activeClass: 'active',
    disabledClass: 'disabled',
    itemClass: undefined,
    linkClass: undefined,
    activeLinkCLass: undefined,
    isActive: false,
    isDisabled: false,
  }

  handleClick (e) {
    const { isDisabled, pageNumber } = this.props;
    e.preventDefault();
    if (isDisabled) {
      return;
    }
    this.props.onClick(pageNumber);
  }

  render () {
    const {
          pageText,
          pageNumber,
          activeClass,
          itemClass,
          linkClass,
          activeLinkClass,
          disabledClass,
          isActive,
          isDisabled,
        } = this.props;

    const css = cx(itemClass, {
      [activeClass]: isActive,
      [disabledClass]: isDisabled,
    });

    const linkCss = cx(linkClass, {
      [activeLinkClass]: isActive,
    });

    return (
      <li className={css} onClick={::this.handleClick}>
        <a className={linkCss}>
          { pageText }
        </a>
      </li>
    );
  }
}