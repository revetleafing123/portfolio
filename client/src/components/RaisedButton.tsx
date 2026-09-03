// Reusable natural 3D control: preserve the portfolio's dark surface and create depth through bevel edges and physical press movement, never glow or shadow.
import * as React from "react";

import { cn } from "@/lib/utils";

type RaisedButtonBaseProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
  variant?: "default" | "mauve-brown";
};

type RaisedButtonLinkProps = RaisedButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

type RaisedButtonElementProps = RaisedButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

export type RaisedButtonProps = RaisedButtonLinkProps | RaisedButtonElementProps;

const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-3.5 text-sm",
  lg: "px-6 py-4 text-base",
};

const iconOnlySizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "p-0 w-8 h-8 text-sm",
  md: "p-0 w-10 h-10 text-base",
  lg: "p-0 w-12 h-12 text-base",
};

const raisedButtonBaseClassName = "natural-3d-button inline-flex items-center justify-center rounded-full font-semibold gap-2";

export function RaisedButton(props: RaisedButtonProps) {
  const { children, className, size = "md", iconOnly = false, variant = "default" } = props;
  const sizeClassName = iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size];
  const variantClassName = variant === "mauve-brown" ? "natural-3d-button--mauve-brown" : "";
  const classes = cn(raisedButtonBaseClassName, variantClassName, sizeClassName, className);

  if ("href" in props && props.href) {
    const { href, children: _c, className: _cn, size: _s, iconOnly: _io, variant: _v, ...linkProps } = props;
    return (
      <a href={href} className={classes} {...linkProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as RaisedButtonElementProps;
  const { href: _href, children: _children, className: _className, size: _size, iconOnly: _iconOnly, variant: _variant, ...rest } = buttonProps;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
