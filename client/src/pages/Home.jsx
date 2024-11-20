import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Banner from '../components/Banner';
export default function Home() {
  return (
    
    <div className='px-4 py-12 max-w-1xl mx-auto'>
      <Hero />
      <Banner />
      <Services />
      
    </div>
  );
}
