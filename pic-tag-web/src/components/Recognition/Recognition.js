import React from 'react';

const Recognition=({imageUrl})=>{
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
      </div>
    </div>
  );
}
export default Recognition;
