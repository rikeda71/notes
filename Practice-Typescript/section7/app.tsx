import React from 'react';
import ReactDom from 'react-dom';
import Index from './index';
import UseState from './fc/usestate';
import UseMemo from './fc/usememo';
import UseCallback from './fc/usecallback';
import UseEffect from './fc/useeffect';
import UseRef from './fc/useref';
import UseReducer from './fc/usereducer';
import TypedReducer from './reducer/app';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Index />
      <UseState />
      <UseMemo />
      <UseCallback />
      <UseEffect />
      <UseRef />
      <UseReducer />
      <line />
      {'Reducer'}
      <TypedReducer />
    </React.Fragment>
  );
};
ReactDom.render(<App />, document.getElementById('app'));
