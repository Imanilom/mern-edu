import React from "react";
import { TbWorld } from "react-icons/tb";
import { GoDeviceMobile } from "react-icons/go";
import { RiComputerLine } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { FaSquareWebAwesomeStroke } from "react-icons/fa6";
import { ImMusic } from "react-icons/im";
import { delay, motion } from "framer-motion";
const servicesData = [
  {
    id: 1,
    title: "Web Development",
    link: "#",
    icon: <TbWorld />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "Mobile development",
    link: "#",
    icon: <GoDeviceMobile />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "Software development",
    link: "#",
    icon: <RiComputerLine />,
    delay: 0.4,
  },
  {
    id: 4,
    title: "Satisfied clients",
    link: "#",
    icon: <BsEmojiSmile />,
    delay: 0.5,
  },
  {
    id: 5,
    title: "SEO optimization",
    link: "#",
    icon: <FaSquareWebAwesomeStroke />,
    delay: 0.6,
  },
  {
    id: 6,
    title: "24/7 support",
    link: "#",
    icon: <ImMusic />,
    delay: 0.7,
  },
];
const Services = () => {
  return (
    <section className="bg-white m-5">
      <div className="container pb-14 pt-16">
        <h1 className="text-4xl font-bold text-center md:text-left pb-10">
          Services we provide
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {servicesData.map((service) => (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{delay: service.delay}}
              viewport={{ once: true }}
              className="bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h1 className="text-xl font-semibold text-center px-3">
                {service.title}
              </h1>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;