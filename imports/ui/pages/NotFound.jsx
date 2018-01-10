import React from 'react';

function NotFound({location}) {
  return (
    <div className='NotFound'>
      <h1>This page &quot;{location.pathname}&quot; can not be found</h1>
    </div>
  );
}

export default NotFound;
