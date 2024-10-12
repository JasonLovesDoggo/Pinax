import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import Link from "next/link";
import Image from "next/image";
import { cn } from "~/lib/utils";
import React from "react";
import {
  IconChevronDown,
  IconArrowUpRight,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react";
import { Button } from "~/components/ui/button";
import green from "~/public/green.webp";
import blue from "~/public/blue.webp";
const NavDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger className="-mt-1 h-auto rounded-full bg-transparent p-0 px-3 py-1 text-base font-normal hover:bg-black/30">
        more
        <IconChevronDown className="ml-1 inline-block h-3 w-3" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex justify-start pb-0">More</DrawerTitle>
        </DrawerHeader>
        <ul className="grid h-fit grid-cols-2 gap-3 p-4 text-white">
          <DrawerClose asChild>
            <ListItem
              title="uses"
              href="/uses"
              className="relative z-10 hover:text-white hover:opacity-80"
            >
              <Image
                className="absolute inset-0 -z-40 h-full w-full rounded-md object-cover brightness-50"
                src={blue}
                alt="uses"
                placeholder="blur"
              />
            </ListItem>
          </DrawerClose>

          <DrawerClose asChild>
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
          </DrawerClose>
        </ul>

        <DrawerFooter>
          <p className="py-4 font-bold">Online</p>
          <Button variant="secondary">
            <a
              href="http://github.com/vimfn"
              target="_blank"
              rel="noopener noreferrer"
              className="h-full w-full"
            >
              <IconBrandGithub className="mb-1 mr-1 inline-flex" size={15} />
              GitHub
            </a>
          </Button>
          <Button variant="secondary">
            <a
              href="https://www.linkedin.com/in/vimfn/"
              rel="noopener noreferrer"
              className="h-full w-full"
            >
              <IconBrandLinkedin className="mb-1 mr-1 inline-flex" size={15} />
              LinkedIn
            </a>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <Link
        href={props.href!}
        ref={ref}
        className={cn(
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block h-12 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
          className,
        )}
        {...props}
      >
        <div className="font-medium leading-none">
          {title} <IconArrowUpRight className="inline-flex" size="18" />
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
          {children}
        </p>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
