import { motion } from "framer-motion";
const Hero = () => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="min-h-screen flex flex-col items-center justify-center text-center relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white px-6"
  >
    <div className="z-10">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold mb-6"
      >
        Transforming Education
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg md:text-2xl max-w-2xl mx-auto mb-8"
      >
        Empowering learners worldwide through innovative educational technology
      </motion.p>
      <motion.a
        href="#mission"
        whileHover={{ scale: 1.05 }}
        className="inline-block px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-md hover:bg-gray-100 transition"
      >
        Learn More
      </motion.a>
    </div>
  </motion.section>
);
export default Hero;
