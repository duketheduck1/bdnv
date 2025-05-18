// Mock type definitions for recharts
declare module 'recharts' {
  import * as React from 'react';

  export interface AreaProps {
    type?: string;
    dataKey?: string;
    name?: string;
    stroke?: string;
    fill?: string;
    [key: string]: any;
  }

  export interface AreaChartProps {
    data?: any[];
    children?: React.ReactNode;
    [key: string]: any;
  }

  export interface CartesianGridProps {
    strokeDasharray?: string;
    [key: string]: any;
  }

  export interface XAxisProps {
    dataKey?: string;
    [key: string]: any;
  }

  export interface YAxisProps {
    [key: string]: any;
  }

  export interface TooltipProps {
    content?: React.ReactNode;
    [key: string]: any;
  }

  export interface ResponsiveContainerProps {
    width?: number | string;
    height?: number | string;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export const AreaChart: React.FC<AreaChartProps>;
  export const Area: React.FC<AreaProps>;
  export const CartesianGrid: React.FC<CartesianGridProps>;
  export const XAxis: React.FC<XAxisProps>;
  export const YAxis: React.FC<YAxisProps>;
  export const Tooltip: React.FC<TooltipProps>;
  export const ResponsiveContainer: React.FC<ResponsiveContainerProps>;
}
