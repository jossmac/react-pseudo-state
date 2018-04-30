// @flow

import React, { Component, type ComponentType } from 'react';

function isActionKey(event) {
  const actionKeys = ['Enter', ' '];
  return actionKeys.includes(event.key);
}
function isTouchDevice() {
  return (
    (window && 'ontouchstart' in window) ||
    (navigator && navigator.maxTouchPoints)
  );
}

type State = {
  isActive: boolean,
  isFocus: boolean,
  isHover: boolean,
};

export default function withPseudoState(WrappedComponent: ComponentType<*>) {
  return class ComponentWithPseudoState extends Component<*, State> {
    isTouchDevice = isTouchDevice();
    state = {
      isActive: false,
      isFocus: false,
      isHover: false,
    };
    handleBlur = () => this.setState({ isFocus: false });
    handleFocus = () => this.setState({ isFocus: true });
    handleMouseOut = () => this.setState({ isActive: false, isHover: false });
    handleMouseOver = () => {
      if (!this.isTouchDevice) {
        this.setState({ isHover: true });
      }
    };
    handleMouseUp = () => this.setState({ isActive: false });
    handleMouseDown = () => this.setState({ isActive: true });
    handleKeyDown = (event: KeyboardEvent) => {
      if (isActionKey(event)) {
        this.setState({ isActive: true });
      }
    };
    handleKeyUp = (event: KeyboardEvent) => {
      if (isActionKey(event)) {
        this.setState({ isActive: false });
      }
    };
    handleTouchStart = () => {
      this.setState({ isActive: true });
    };
    handleTouchEnd = () => {
      this.setState({ isActive: false });
    };
    render() {
      return (
        <WrappedComponent
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onMouseLeave={this.handleMouseOut}
          onMouseEnter={this.handleMouseOver}
          onMouseUp={this.handleMouseUp}
          onMouseDown={this.handleMouseDown}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
          {...this.state}
          {...this.props}
        />
      );
    }
  };
}
