import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineMenuOpen } from "react-icons/md";
import SideBar from "./SideBar";

const SideBarDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button onClick={onOpen}>
        <MdOutlineMenuOpen color="purple" size={35} />
      </button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>FitQuest</DrawerHeader>

          <DrawerBody className="relative" onClick={onClose}>
            <SideBar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBarDrawer;
