import React from "react";
// import Navbar from '../Navbar/Navbar'
import { FaArrowRight } from "react-icons/fa";
import HeroImage from "../assets/Disdik.jpg";
import BlogImage from "../assets/logo.png";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero m-5 bg-light overflow-hidden relative">
      {/* <Navbar /> */}
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
        {/* brand info */}
        <div className="flex flex-col justify-center py-14 md:py-0 relative z-[1]">
          <div className="text-center md:text-left space-y-10 lg:max-w-[450px]">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl lg:text-5xl font-bold !leading-sung"
            >
              Let's Learn to <br /> build a{" "}
              <span className="text-secondry">Website</span>
              <br /> for your business
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="flex justify-center md:justify-start"
            >
              <button className="primary-btn flex items-center gap-2 group:">
                Get Started
                <FaArrowRight className="text-xl group-hover:translate-x-2" />
              </button>
            </motion.div>
          </div>
        </div>
        {/* Hero Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src={HeroImage}
            alt="Hero Image"
            className="w-[400px] xl:w-[600px] relative z-[2] drop-shadow"
          />
          {/* <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src={BlogImage}
            alt="Blog Image"
            className="absolute -bottom-32 w-[800px] md:w-[1500px] z-[1] hidden md:block"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;