import React, { Component } from 'react';
import { render } from 'react-dom';

import {
  Anchor,
  AsteriskText,
  Button,
  Code,
  Container,
  Footer,
  Header,
  Icon,
  NoBreak,
  Repo,
  Title,
} from './styled';
import './index.css';

// example
// ------------------------------

// const bigArrayForTesting = new Array(10000).fill('whatever');

const App = () => (
  <Container>
    <div>
      <Header>
        <Icon role="img" className="animate-dropin">
          🎛
        </Icon>
        <Title>
          Stay <Code>active</Code> with{' '}
          <Repo href="https://github.com/jossmac/react-pseudo-state">
            react-pseudo-state
          </Repo>:{' '}
        </Title>
        a higher order component which helps you <Code>focus</Code> on your
        work. Make your next CSS-in-JS project a{' '}
        <NoBreak>
          pus<Code>hover</Code>*
        </NoBreak>.
      </Header>
      <Button keyboardSupport="both">Pseudo State</Button>

      <Footer>
        <span> by </span>
        <a href="https://twitter.com/jossmackison" target="_blank">
          @jossmac
        </a>
        <AsteriskText>* Okay, that last one was a stretch.</AsteriskText>
      </Footer>
    </div>
  </Container>
);

// render
// ------------------------------

render(<App />, document.getElementById('root'));
