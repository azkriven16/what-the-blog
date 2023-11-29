import { ShipWheelIcon } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center uppercase font-bold sm:text-xl group hover:text-primary hover:underline"
    >
      what the bl
      <ShipWheelIcon
        size={25}
        className="group-hover:animate-spin text-primary group-hover:text-foreground"
      />
      g
    </Link>
  );
}
