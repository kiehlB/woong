import { motion, useCycle } from "framer-motion";
import MenuToggle from "../common/FramerMenuToggle";
import Navigation from "./Nav";

export type SidebarProps = {};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

function Sidebar({}: SidebarProps) {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <>
      <>
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom='100%'
        >
          <motion.div className='navbar' variants={sidebar} />
          <Navigation />
          <div className='xxl:hidden h-16 flex  justify-end items-center'>
            <MenuToggle toggle={() => toggleOpen()} />
          </div>
        </motion.nav>
      </>
    </>
  );
}

export default Sidebar;