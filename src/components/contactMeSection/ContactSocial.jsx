import SingleContactSocial from "./SingleContactSocial";
import { FaLinkedinIn } from "react-icons/fa";
// import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
// import Tooltip from '../ui/Tooltip.jsx'

const ContactSocial = () => {
  return (
    <div className="flex gap-4">
      {/* <SingleContactSocial link="https://www.linkedin.com/in/surenderdubey?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" Icon={FaLinkedinIn} /> */}
      {/* <SingleContactSocial link="https://github.com/Surenderdubeyofficial" Icon={FiGithub} /> */}
      {/* <Tooltip /> */}
      <SingleContactSocial link="https://leetcode.com/u/9582514339/" Icon={SiLeetcode} />
    </div>
  );
};

export default ContactSocial;
