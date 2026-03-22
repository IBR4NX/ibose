"use client";

import { forwardRef } from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${className ?? ""}`}
        {...props}
      >
        {children ?? "Card"}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
