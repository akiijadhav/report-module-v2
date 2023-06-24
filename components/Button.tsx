import React from 'react';

function Button({ text }) {
  return (
    <div>
      <button
        className="text-light-blue-600"
        onClick={() => console.log('clicked')}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
