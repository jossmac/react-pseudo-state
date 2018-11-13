// @flow

// $FlowFixMe
import React, { type ComponentType, forwardRef } from 'react';
import PseudoState, { type State, type Props } from './PseudoState';

type WrappedProps = Props & State;

export default function withPseudoState(WrappedComponent: ComponentType<WrappedProps>) {
  return forwardRef(({ keyboardSupport, ...props }: any, ref) => (
    <PseudoState keyboardSupport={keyboardSupport}>
      {(handlers, snapshot) => <WrappedComponent ref={ref} {...props} {...handlers} {...snapshot} />}
    </PseudoState>
  ));
}
