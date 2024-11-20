import React, { useState } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [isVisiOpen, setIsVisiOpen] = useState(false);
  const [isMisiOpen, setIsMisiOpen] = useState(false);

  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-left mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Visi & Misi</h1>
          <p className="text-lg text-gray-600">
            Temukan tujuan dan komitmen kami dalam mewujudkan visi dan misi yang
            berdampak positif untuk masa depan.
          </p>
        </section>

        {/* Grid untuk Visi & Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi Section */}
          <motion.section
            className="bg-white shadow-md rounded-lg p-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setIsVisiOpen(!isVisiOpen)}
              className="w-full text-left font-semibold text-black mb-4 flex items-center justify-between"
            >
              <span className="text-2xl">Visi</span>
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isVisiOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={isVisiOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              {isVisiOpen && (
                <p className="text-black">
                  Kami bercita-cita menjadi lembaga pendidikan terdepan yang mencetak
                  generasi berkualitas dan berdaya saing global, dengan penekanan pada
                  pembelajaran yang inovatif dan berorientasi pada kebutuhan masa depan.
                </p>
              )}
            </motion.div>
          </motion.section>

          {/* Misi Section */}
          <motion.section
            className="bg-white shadow-md rounded-lg p-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setIsMisiOpen(!isMisiOpen)}
              className="w-full text-left font-semibold text-black mb-4 flex items-center justify-between"
            >
              <span className="text-2xl">Misi</span>
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMisiOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={isMisiOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              {isMisiOpen && (
                <ul className="list-disc list-inside text-black">
                  <li className="mb-2">Menyediakan pendidikan berkualitas tinggi yang relevan dengan perkembangan zaman.</li>
                  <li className="mb-2">Mendorong pengembangan potensi individu melalui metode pembelajaran yang inovatif.</li>
                  <li className="mb-2">Menjalin kemitraan dengan berbagai pihak untuk meningkatkan kualitas pendidikan.</li>
                  <li className="mb-2">Menghasilkan lulusan yang siap menghadapi tantangan global dengan keterampilan yang relevan.</li>
                </ul>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default About;