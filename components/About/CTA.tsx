// components/About/CTA.tsx
import { motion } from "framer-motion";

const CTA = () => (
  <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold mb-8">Ready to Transform Education?</h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-blue-600 px-8 py-4 rounded-full text-xl font-semibold hover:shadow-lg transition-shadow"
      >
        Get Started Today
      </motion.button>
    </div>
  </section>
);

export default CTA;
