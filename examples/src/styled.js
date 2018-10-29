import React from 'react';
import { css } from 'emotion';
import withPseudoState from '../../src/withPseudoState';

const gutter = 15;

const mergeStr = (...args) => args.join(' ');
const mergeObj = (...args) => args.reduce((obj, val) => ({ ...obj, ...val }), {});

// styled components
// ------------------------------

export const Container = props => (
  <div
    className={css({
      display: 'flex ',
      flexDirection: 'column',
      minHeight: '100vh',
      boxSizing: 'border-box',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 410,
      padding: '60px 15px',
      textAlign: 'center',
    })}
    {...props}
  />
);

export const Repo = ({ isLocked, ...props }) => (
  <a
    target="_blank"
    className={css({
      borderBottom: '1px dotted rgba(0, 0, 0, 0.3)',
      color: 'inherit',
      paddingBottom: 1,
      textDecoration: 'none',

      ':hover, :focus': {
        borderBottomColor: 'rgba(0, 0, 0, 0.6)',
        borderBottomStyle: 'solid',
        textDecoration: 'none',
      },
    })}
    {...props}
  />
);

/*
  ==============================
  Pseudo State
  ==============================
*/

const states = [
  {
    text: 'Hover',
    show: p => p.isHover,
  },
  {
    text: 'Focus',
    show: p => p.focusOrigin === 'keyboard',
  },
  {
    text: 'Active',
    show: p => p.isActive,
  },
];

const showTxt = props => states.filter(s => s.show(props)).map(s => s.text);
const safe = (condition, obj) => (condition ? obj : {});

const ButtonElement = props => {
  const { focusOrigin, isActive, isFocus, isHover, ...rest } = props;
  const activeStyles = safe(isActive, {
    background: '#e9ecef',
    borderColor: 'rgba(27,31,35,0.35)',
    boxShadow: 'inset 0 0.15em 0.3em rgba(27,31,35,0.15)',
    boxShadow: 'none',
    transform: `none`,
  });
  const focusStyles = safe(focusOrigin === 'keyboard', {
    background: 'linear-gradient(-180deg, #fafbfc, #eff3f6 90%)',
    borderColor: 'rgba(27,31,35,0.35)',
    outline: '4px dotted #BF2600',
    outlineOffset: '4px',

    '::-moz-focus-inner': {
      border: 0,
    },
  });
  const hoverStyles = safe(isHover, {
    background: 'linear-gradient(-180deg, #fafbfc, #eff3f6 90%)',
    borderColor: 'rgba(27,31,35,0.35)',
    boxShadow: '0 2px 4px rgba(27,31,35,0.15)',
  });

  return (
    <button
      className={css(mergeObj({
        alignItems: 'center',
        background: 'linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%)',
        border: '1px solid rgba(27,31,35,0.2)',
        borderRadius: 4,
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'flex ',
        fontFamily: 'inherit',
        fontSize: 24,
        letterSpacing: '-0.05em',
        lineHeight: '2.3em',
        height: '2.4em',
        justifyContent: 'center',
        outline: 0,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'relative',
        width: '100%',
        userSelect: 'none',
      },
      hoverStyles,
      focusStyles,
      activeStyles
    ))}
    {...rest}
    >
      {showTxt(props).join(', ') || 'Inactive'}
    </button>
  );
};
export const Button = withPseudoState(ButtonElement);

/*
  ==============================
  Misc.
  ==============================
*/

export const Header = props => <header className={css({ marginBottom: '2em' })} {...props} />;
export const Footer = props => <footer className={css({ marginTop: '2em' })} {...props} />;
export const AsteriskText = props => (
  <div className={css({ fontSize: 14, marginTop: '2em' })} {...props} />
);
export const NoBreak = props => <span className={css({ whiteSpace: 'nowrap' })} {...props} />;
export const Icon = ({ className, ...props }) => (
  <div
    className={mergeStr(
      css({
        fontSize: 64,
        height: 64,
        lineHeight: 1,
        margin: '0 auto 0.5em',
        position: 'relative',
        width: 64,
      }),
      className
    )}
    {...props}
  />
);
export const Title = props => (
  <h1
    className={css({
      display: 'inline',
      fontSize: 'inherit',
      fontWeight: 500,
      letterSpacing: '-0.025em',
      margin: 0,
    })}
    {...props}
  />
);
export const Code = props => (
  <code
    className={css({
      // backgroundColor: 'rgba(0, 0, 0, 0.09)',
      backgroundColor: '#FFEBE5',
      borderRadius: '3px',
      color: '#BF2600',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: '0.95em',
      lineHeight: '1.2',
      margin: '0 -0.2em',
      padding: '0 0.2em',
      position: 'relative',
      zIndex: -1,
    })}
    {...props}
  />
);
