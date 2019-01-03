import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  render() {
    return (
      <h1>let's get this BREAD!</h1>
    );
  }
}
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

module.hot.accept();