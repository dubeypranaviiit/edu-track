// components/About/Features.tsx
import { motion } from "framer-motion";

interface Feature {
  title: string;
  icon: JSX.Element;
  description: string;
}

interface FeaturesProps {
  features: Feature[];
}

const Features = ({ features }: FeaturesProps) => (
  <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
    <div className="container mx-auto px-6">
      {/* Gradient Heading */}
      <h2 className="text-4xl font-extrabold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text dark:from-indigo-400 dark:to-purple-400">
        What Sets Us Apart
      </h2>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 gap-y-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl hover:ring-2 hover:ring-indigo-500 dark:hover:ring-indigo-400 transition-all duration-300"
          >
            <div className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
