import React, { Component } from 'react';

export default function withPseudoState(WrappedComponent) {
  return class ComponentWithPseudoState extends Component {
    actionKeys = ['Enter', ' '];
    state = {
      isActive: false,
      isFocus: false,
      isHover: false,
    };
    handleBlur = () => this.setState({ isFocus: false });
    handleFocus = () => this.setState({ isFocus: true });
    handleMouseOut = () => this.setState({ isActive: false, isHover: false });
    handleMouseOver = () => this.setState({ isHover: true });
    handleMouseUp = () => this.setState({ isActive: false });
    handleMouseDown = () => this.setState({ isActive: true });
    handleKeyDown = event => {
      if (this.actionKeys.includes(event.key)) {
        this.setState({ isActive: true });
      }
    };
    handleKeyUp = event => {
      if (this.actionKeys.includes(event.key)) {
        this.setState({ isActive: false });
      }
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
          {...this.state}
          {...this.props}
        />
      );
    }
  };
}
