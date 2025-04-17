import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';

const HomePage = () => {
  const {navigate} = useContext(AppContext);
  return (
    <div>
      <div>
        <h1>To-Do-List</h1>
      </div>
        HomePage
        <button className='bg-blue-500 rounded-2xl px-3 py-2 text-white' onClick={()=>navigate('/123')}>sa</button>
    </div>
  )
}

export default HomePage
