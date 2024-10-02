import { NavbarBrand, Navbar as NextNavbar } from "@nextui-org/navbar";
import TwelveLabsIcon from "@/icons/twelvelabs.svg";

export default function Navbar() {
  return (
    <NextNavbar>
      <NavbarBrand className='gap-x-2'>
        <TwelveLabsIcon className='w-6 h-6 dark:text-white text-[#333333]' />
        <p className='font-bold text-inherit'>Got Milk?</p>
      </NavbarBrand>
    </NextNavbar>
  );
}
