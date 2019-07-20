import React from 'react';
import ReactDOM from 'react-dom';

// ReactDOMにより id="root" の要素を置き換える
ReactDOM.render(
    <div className="content">
      <p>Hello, World!</p>
    </div>,
    document.getElementById('root')
);