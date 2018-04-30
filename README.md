# React Pseudo state

A higher order component to replace pseudo-states when working with a CSS in JS solution.

```js
import withPseudoState from 'react-pseudo-state';

const ButtonElement = ({ isActive, isFocus, isHover, ...rest }) => {
  const hoverAndFocus = isHover || isFocus
    ? { textDecoration: 'underline' }
    : null;

  return (
    <button css={{
      color: isActive ? 'slateGray' : 'lightSlateGray',
      ...hoverAndFocus
    }} {...rest} />
  );
}

export const Button = withPseudoState(ButtonElement);
```
