import { NavbarBrand, Navbar as NextNavbar } from '@nextui-org/navbar'
import TwelveLabsIcon from '@/icons/twelvelabs.svg'

export default function Navbar() {
	return (
		<NextNavbar maxWidth="full">
			<NavbarBrand className="gap-x-3">
				<TwelveLabsIcon className="h-6 w-6 text-[#333333] dark:text-white" />
				<p className="text-lg font-bold">Got Milk?</p>
			</NavbarBrand>
		</NextNavbar>
	)
}
