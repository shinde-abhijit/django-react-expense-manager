import React, { useEffect } from 'react'

const Homepage = () => {
  useEffect(() => {
    document.title = 'Homepage';
  }, []);
  
  
  return (
    <div>Homepage</div>
  )
}

export default Homepage