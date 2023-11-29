import Logo from "./logo";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <Logo />
      <ModeToggle />
    </nav>
  );
}
