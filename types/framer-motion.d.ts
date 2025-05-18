// Mock type definitions for framer-motion
declare module 'framer-motion' {
  import * as React from 'react';

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLDivElement>>;
    span: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLSpanElement>>;
    button: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLButtonElement>>;
    a: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLAnchorElement>>;
    ul: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLUListElement>>;
    li: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLLIElement>>;
    [key: string]: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<any>>;
  };
}
