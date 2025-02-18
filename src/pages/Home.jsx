import React from 'react'
import Carousel from '../components/CarouselPopular'
import Hero from '@/components/Hero'




const Home = () => {
  return (
    <div className='bg-blue-950 h-full'>
      <Hero/>
      <Carousel/>
    </div>
  )
}

export default Home