import React from 'react';

const Button = (props) => {
  return <div style={{ fontSize: '30px' ,width: '100%', display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow'}}>remote: {props.description}</div>
}

export default Button