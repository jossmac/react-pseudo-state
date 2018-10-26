// @flow

import React, { Component, type ComponentType, type Node, type Ref } from 'react';

const TAB_KEY_CODE = 9;
const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const not = (fn) => (...args) => !fn(...args);
const validKey = (event, support) => {
  if (support === 'none') return false;

  const keys = [];
  if (support === 'space' || support === 'both') keys.push(SPACE_KEY_CODE);
  if (support === 'enter' || support === 'both') keys.push(ENTER_KEY_CODE);

  return keys.includes(event.which);
};
const invalidKey = not(validKey);
const isTouchDevice = () => Boolean(
  (window && 'ontouchstart' in window) || (navigator && navigator.maxTouchPoints)
);

type Handlers = {
  onBlur: () => mixed,
  onFocus: () => mixed,
  onKeyDown: (event: SyntheticKeyboardEvent<HTMLElement>) => mixed,
  onKeyUp: (event: SyntheticKeyboardEvent<HTMLElement>) => mixed,
  onMouseDown: () => mixed,
  onMouseEnter: () => mixed,
  onMouseLeave: () => mixed,
  onMouseUp: () => mixed,
  onTouchEnd: () => mixed,
  onTouchStart: () => mixed,
};

export type State = {
  // let consumers know what triggered the focused state
  focusOrigin: null | 'keyboard' | 'mouse',
  // mouse is down or press is occuring on element
  isActive: boolean,
  // element has received focus
  isFocus: boolean,
  // mouse is over element
  isHover: boolean,
};
export type Props = {
  // handlers must be passed the outermost node returned from this function
  children: (handlers: Handlers, snapshot: State) => Node,
  // NOTE: native behaviour dictates that `Enter` is for anchors and buttons,
  // whilst `Space` is only called on buttons. Leave it up to consumers to
  // decide rather that sniffing for the element type; better to be explicit.
  keyboardSupport: 'enter' | 'space' | 'both' | 'none',
};

export default class PseudoState extends Component<Props, State> {
  static defaultProps = {
    keyboardSupport: 'enter',
  };
  componentDidMount() {
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('keyup', this.keyup);
  }
  isTouchDevice = isTouchDevice();
  tabIsDown = false;
  state = {
    focusOrigin: null,
    isActive: false,
    isFocus: false,
    isHover: false,
  };

  keydown = (e: SyntheticKeyboardEvent<HTMLElement>) => {
    if (e.which !== TAB_KEY_CODE) return;
    this.tabIsDown = true;
  }
  keyup = (e: SyntheticKeyboardEvent<HTMLElement>) => {
    if (e.which !== TAB_KEY_CODE) return;
    this.tabIsDown = false;
  }

  handleBlur = () => {
    this.setState({ isFocus: false, focusOrigin: null });
  }
  handleFocus = () => {
    const focusOrigin = this.tabIsDown ? 'keyboard' : 'mouse';
    this.setState({ isFocus: true, focusOrigin });
  };
  handleMouseLeave = () => {
    this.setState({ isActive: false, isHover: false });
  }
  handleMouseEnter = () => {
    // NOTE: `mouseenter` is called during `touchstart` on some devices. bail
    // early to avoid an invalid state.
    if (this.isTouchDevice) return;
    this.setState({ isHover: true });
  };
  handleMouseUp = () => {
    // NOTE: touch start/end occur before mouse events. bail early to avoid
    // duplicate state calls on touch devices.
    if (this.isTouchDevice) return;
    this.setState({ isActive: false });
  }
  handleMouseDown = () => {
    // NOTE: touch start/end occur before mouse events. bail early to avoid
    // duplicate state calls on touch devices.
    if (this.isTouchDevice) return;
    this.setState({ isActive: true });
  }
  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    if (invalidKey(event, this.props.keyboardSupport)) return;
    this.setState({ isActive: true });
  };
  handleKeyUp = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    if (invalidKey(event, this.props.keyboardSupport)) return;
    this.setState({ isActive: false });
  };
  handleTouchStart = () => {
    this.setState({ isActive: true });
  };
  handleTouchEnd = () => {
    this.setState({ isActive: false });
  };
  render() {
    const handlers = {
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      onMouseDown: this.handleMouseDown,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      onTouchEnd: this.handleTouchEnd,
      onTouchStart: this.handleTouchStart,
    };
    const snapshot = this.state;

    return this.props.children(handlers, snapshot);
  }
}
