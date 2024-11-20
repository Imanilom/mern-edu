import React, { useRef, useEffect } from 'react';

const newsArticles = [
  { id: 1, title: 'Pendidikan di Era Digital', date: '10 Sept 2024', description: 'Bagaimana teknologi mengubah cara belajar anak-anak.', imgUrl: '../src/assets/google.jpg' },
  { id: 2, title: 'Peran Guru dalam Pendidikan Modern', date: '08 Sept 2024', description: 'Pentingnya guru dalam membimbing generasi muda.', imgUrl: '../src/assets/google.jpg' },
  { id: 3, title: 'Siswa Berprestasi di Yayasan Kami', date: '05 Sept 2024', description: 'Prestasi siswa yang telah mengharumkan nama sekolah.', imgUrl: '../src/assets/google.jpg' },
  { id: 4, title: 'Inovasi Pembelajaran Online', date: '02 Sept 2024', description: 'Manfaat dan tantangan pembelajaran daring.', imgUrl: '../src/assets/google.jpg' },
  { id: 5, title: 'Pentingnya Kolaborasi dalam Belajar', date: '01 Sept 2024', description: 'Kolaborasi antara siswa dan guru untuk pembelajaran yang efektif.', imgUrl: '../src/assets/google.jpg' },
];

const HeroSection = () => {
  const scrollRef = useRef(null);

  // Function to scroll automatically to the right
  const autoScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Set interval to auto scroll every 3 seconds (3000 milliseconds)
    const interval = setInterval(() => {
      autoScroll();
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return ( 
    <div 
      className="bg-cover bg-center py-12 min-h-screen flex flex-col justify-end opacity-100"
      style={{ backgroundImage: "url('../src/assets/hero-1.jpg')" }}
    >
      <div className="container mx-auto px-4 -mb-60">
        
        {/* Wrapper for the text in a container */}
        <div className="bg-opacity-20 bg-gray-300 p-5 rounded-lg mb-20">
          {/* Welcome Text - Aligned to Left */}
          <h1 className="text-4xl font-mono text-left text-white mb-4 animate-bounce">
            Selamat Datang di Yayasan kami
          </h1>

          {/* Description paragraph */}
          <p className="text-xl font-mono text-left text-white animate-marquee">
            Elearning adalah sesuatu wadah untuk pembelajaran yang bekompenten. LMS (Learning Management System)
            adalah sebuah platform atau sistem perangkat lunak yang digunakan untuk mengelola, mendistribusikan, 
            dan mengakses konten pembelajaran secara online.
          </p>
        </div>

        {/* Button - Aligned to Left */}
        <div className="text-left mt-4 mb-10">
          <button className="bg-lime-50 text-black py-3 px-4 rounded-lg shadow-md hover:bg-white transition duration-300">
            Come Join
          </button>
        </div>

        {/* News Section */}
        <div className="relative">
          <div 
            className="overflow-x-auto flex space-x-5 scrollbar-hide" 
            ref={scrollRef} 
            style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}
          >
            {newsArticles.map((article) => (
              <div key={article.id} className="min-w-[300px] bg-white p-5 shadow-lg rounded-lg bg-opacity-100 scroll-snap-align-start">
                {/* Image section */}
                <img src={article.imgUrl} alt={article.title} className="w-full h- object-cover rounded-lg mb-4" />
                <h3 className="text-2xl font-bold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{article.date}</p>
                <p>{article.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
