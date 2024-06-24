import { MdOutlineMenuOpen } from "react-icons/md";
import SideBar from "./SideBar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const SideBarDrawer = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <MdOutlineMenuOpen color="purple" size={35} />
        </SheetTrigger>
        <SheetContent side={"left"} className="px-0 w-[220px]">
          <SheetClose className="dark:text-white" />
          <SideBar />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SideBarDrawer;
