import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export type ButtonLinkProps = PrismicNextLinkProps & {
  variant?: "primary" | "secondary";
};

export const ButtonLink = ({
  className,
  variant = "primary",
  ...restProps
}: ButtonLinkProps) => {
  return (
    <PrismicNextLink
      className={clsx(
        "inline-flex items-center justify-center px-12 py-4 text-center font-extrabold tracking-wider uppercase transition-colors duration-300",
        variant === "secondary"
          ? "border border-white text-white hover:bg-white/20"
          : "bg-white text-black hover:bg-white/80",
        className,
      )}
      {...restProps}
    />
  );
};
