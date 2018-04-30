/* @jsx glam */
import glam from 'glam';
import withPseudoState from '../../src';

const gutter = 15;

// styled components
// ------------------------------

export const Container = props => (
  <div
    css={{
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
    }}
    {...props}
  />
);

export const Repo = ({ isLocked, ...props }) => (
  <a
    target="_blank"
    css={{
      borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
      color: 'inherit',
      paddingBottom: 1,
      textDecoration: 'none',

      ':hover': {
        borderBottomColor: 'rgba(0, 0, 0, 0.6)',
        textDecoration: 'none',
      },
    }}
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
    show: 'isHover',
  },
  {
    text: 'Focus',
    show: 'isFocus',
  },
  {
    text: 'Active',
    show: 'isActive',
  },
];

function filter(props) {
  return states.filter(s => props[s.show]).map(s => s.text);
}

const ButtonElement = props => {
  const { isActive, isFocus, isHover, ...rest } = props;
  const activeStyles = isActive
    ? {
        boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
        transform: 'translate3d(4px, 4px, 0)',
      }
    : null;
  const focusStyles = isFocus
    ? {
        boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
        transform: 'translate3d(0, 0, 0)',
      }
    : null;
  const hoverStyles = isHover
    ? {
        boxShadow: '12px 12px 0 rgba(0,0,0,0.15)',
        transform: 'translate3d(-4px, -4px, 0)',
        '&:after': {
          bottom: -10,
          content: ' ',
          height: '100%',
          position: 'absolute',
          right: -10,
          width: '100%',
        },
      }
    : null;

  return (
    <button
      type="button"
      css={{
        alignItems: 'center',
        backgroundColor: '#BF2600',
        border: 0,
        borderRadius: 1,
        boxSizing: 'border-box',
        boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
        color: '#F4F5F7',
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

        ...hoverStyles,
        ...focusStyles,
        ...activeStyles,
      }}
      {...rest}
    >
      {filter(props).join(', ') || 'Inactive'}
    </button>
  );
};
export const Button = withPseudoState(ButtonElement);

/*
  ==============================
  Misc.
  ==============================
*/

export const Header = props => (
  <header css={{ marginBottom: '2em' }} {...props} />
);
export const Footer = props => <footer css={{ marginTop: '2em' }} {...props} />;
export const AsteriskText = props => (
  <div css={{ fontSize: 14, marginTop: '2em' }} {...props} />
);
export const NoBreak = props => (
  <span css={{ whiteSpace: 'nowrap' }} {...props} />
);
export const Icon = props => (
  <div
    css={{
      fontSize: 64,
      height: 64,
      lineHeight: 1,
      margin: '0 auto 0.5em',
      position: 'relative',
      width: 64,
    }}
    {...props}
  />
);
export const Title = props => (
  <h1
    css={{
      display: 'inline',
      fontSize: 'inherit',
      fontWeight: 500,
      letterSpacing: '-0.025em',
      margin: 0,
    }}
    {...props}
  />
);
export const Code = props => (
  <code
    css={{
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
    }}
    {...props}
  />
);
