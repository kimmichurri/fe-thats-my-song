import React from 'react';
import loader from '../../assets/loader.png';

export default function Loader() {
  return (
    <div className='loading-icon-wrapper'>
      <img
        className='loading-icon'
        src={loader}
        alt='loading icon, the page is loading'
      />
    </div>
  )
}