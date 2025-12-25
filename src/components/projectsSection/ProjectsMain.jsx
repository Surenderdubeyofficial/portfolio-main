import ProjectsText from "./ProjectsText";
import SingleProject from "./SingleProject";
import ComingSoonProject from "./ComingSoonProject";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";

const ProjectsMain = () => {
  return (
    <div
      id="projects"
      className="w-full max-w-screen-xl mx-auto px-2 sm:px-4 py-10 sm:py-20"
    >
      <motion.div
        variants={fadeIn("top", 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
      >
        <ProjectsText />
      </motion.div>

      <div className="flex flex-col gap-20 sm:gap-32 w-full max-w-6xl mx-auto mt-16">
        <motion.div
          variants={fadeIn("right", 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
        >
          <SingleProject
            name="Employee Sphere Manager System"
            year="Mar 2025"
            align="right"
            image="/images/website-img-1.jpg"
            link="https://github.com/Surenderdubeyofficial/employee-sphere-manager-system"
          />
        </motion.div>

        <motion.div
          variants={fadeIn("left", 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
        >
          <SingleProject
            name="SITA"
            year="Jan 2025"
            align="left"
            image="/images/website-img-3.jpg"
            link="https://github.com/Surenderdubeyofficial/rapid-response-traffic-aid"
          />
        </motion.div>

        <motion.div
          variants={fadeIn("right", 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
        >
          <SingleProject
            name="Word Counter"
            year="Sept 2024"
            align="right"
            image="/images/website-img-2.webp"
            link="https://github.com/Surenderdubeyofficial/Word-counter"
          />
        </motion.div>

        <motion.div
          variants={fadeIn("left", 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
        >
          <SingleProject
            name="TruBot"
            year="Aug 2024"
            align="left"
            image="/images/website-img-4.jpg"
            link="https://tr-ubot.vercel.app/"
          />
        </motion.div>
      </div>

      <motion.div
        variants={fadeIn("up", 0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.5 }}
        className="mt-20"
      >
        <ComingSoonProject />
      </motion.div>
    </div>
  );
};

export default ProjectsMain;