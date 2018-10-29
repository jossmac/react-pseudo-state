// @flow

import React, { type ComponentType } from 'react';
import PseudoState, { type State, type Props } from './PseudoState';

type WrappedProps = Props & State;

export default function withPseudoState(WrappedComponent: ComponentType<WrappedProps>) {
  return ({ keyboardSupport, ...props }: any) => (
    <PseudoState keyboardSupport={keyboardSupport}>
      {(handlers, snapshot) => <WrappedComponent {...props} {...handlers} {...snapshot} />}
    </PseudoState>
  );
}
