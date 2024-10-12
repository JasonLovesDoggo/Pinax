"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "~/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

import blue from "~/public/blue.webp";
import green from "~/public/green.webp";

import Image from "next/image";

import NavDrawer from "./nav-drawer";

export function NavMenu() {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.innerWidth < 1024,
  );

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    if (typeof window !== "undefined") {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => {
      // remove event listener when the component is unmounted to not cause any memory leaks
      // otherwise the event listener will continue to be active
      window.removeEventListener("resize", handleResize);
    };
    // add `isMobile` state variable as a dependency so that
    // it is called every time the window is resized
  }, [isMobile]);

  return isMobile ? (
    <NavDrawer />
  ) : (
    <NavigationMenu className="bg-transparent">
      <NavigationMenuList>
        <NavigationMenuItem className="p-0">
          <NavigationMenuTrigger className="-mt-3 h-auto rounded-full bg-transparent p-0 px-3 py-1 text-base font-normal hover:bg-black/30">
            more
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[150px] gap-3 p-4 text-white md:w-[300px] md:grid-cols-2 lg:w-[350px]">
              <ListItem
                title="music"
                href="/music"
                className="relative z-10 hover:text-white hover:opacity-80"
              >
                <Image
                  className="absolute inset-0 -z-40 h-full w-full rounded-md object-cover brightness-50"
                  src={blue}
                  alt="music"
                  placeholder="blur"
                />
              </ListItem>

              <ListItem
                title="faqs"
                href="/faqs"
                className="relative z-10 hover:text-white hover:opacity-80"
              >
                <Image
                  className="absolute inset-0 -z-40 h-full w-full rounded-md object-cover brightness-50"
                  src={green}
                  alt="faqs"
                  placeholder="blur"
                />
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href!}
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
