import { useMenuActive } from "@/hooks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type NavItemProps = Omit<React.ComponentPropsWithoutRef<typeof Link>, 'children'> & {
    children: React.ReactNode | ((isActive: boolean) => JSX.Element);
};

const NavItem = React.forwardRef<React.ElementRef<'a'>, NavItemProps>(
    ({ href, children, className, ...props }, ref) => {
        const isActive = useMenuActive(href);

        return (
            <Link
                href={href}
                className={cn(
                    "hover:text-orange-400 text-white transition-colors duration-100 ease-in-out",
                    isActive && "text-orange-400",
                    className
                )}
                ref={ref}
                {...props}
            >
                {typeof children === 'function' ? children(isActive) : children}
            </Link>
        );
    }
);

NavItem.displayName = "NavItem";

export { NavItem };
