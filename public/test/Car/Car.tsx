"use client";

import { forwardRef } from "react";

type CarProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

const Car = forwardRef<HTMLDivElement, CarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${className ?? ""}`}
        {...props}
      >
        {children ?? "Car"}
      </div>
    );
  }
);

Car.displayName = "Car";

export default Car;
