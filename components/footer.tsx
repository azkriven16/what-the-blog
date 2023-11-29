import React from "react";
import { ModeToggle } from "./mode-toggle";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t pt-10">
      <div className="flex items-center justify-between ">
        <div>
          <p>
            Made with ♥ by{" "}
            <a
              href={siteConfig.portfolio}
              target="_blank"
              className="hover:underline hover:text-primary"
            >
              {siteConfig.author}
            </a>
          </p>
        </div>
        <ModeToggle className="hidden sm:flex" />
      </div>
    </footer>
  );
}
