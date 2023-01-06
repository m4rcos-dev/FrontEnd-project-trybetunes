import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        {/* <h1>Carregando</h1> */}
        <div className="circle-1" />
        <div className="circle-2" />
        <div className="circle-3" />
      </div>
    );
  }
}

export default Loading;
