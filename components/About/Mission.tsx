// components/About/Mission.tsx
import { motion } from "framer-motion";

interface MissionProps {
  isVisible: boolean;
}

const Mission = ({ isVisible }: MissionProps) => (
  <motion.section
    id="mission"
    initial={{ opacity: 0 }}
    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
    transition={{ duration: 0.6 }}
    className="py-20 bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-center"
  >
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
      <p className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed">
        To revolutionize education through cutting-edge technology, bridging learning gaps and creating inclusive,
        personalized, and impactful learning experiences for all.
      </p>
    </div>
  </motion.section>
);
export default Mission;
