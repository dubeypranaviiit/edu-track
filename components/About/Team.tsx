// components/About/Team.tsx
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface TeamProps {
  members: TeamMember[];
}

const Team = ({ members }: TeamProps) => (
  <section className="py-20">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-16">Meet Our Team</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <motion.div key={index} whileHover={{ y: -10 }} className="text-center">
            <div className="w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
            <p className="text-blue-600 dark:text-blue-400 mb-2">{member.role}</p>
            <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
