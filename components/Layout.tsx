import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="max-w-[1200px] mx-auto">
			<Navbar />
			<div>{children}</div>
			<Footer />
		</div>
	);
};
