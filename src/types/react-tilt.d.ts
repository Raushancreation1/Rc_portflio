declare module 'react-tilt' {
  import * as React from 'react';

  export interface TiltOptions {
    reverse?: boolean;
    max?: number;
    perspective?: number;
    scale?: number;
    speed?: number;
    transition?: boolean;
    axis?: 'x' | 'y' | null;
    reset?: boolean;
    easing?: string;
    trackOnWindow?: boolean;
    gyroscope?: boolean;
  }

  export interface TiltProps {
    options?: Partial<TiltOptions>;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export default class Tilt extends React.Component<TiltProps> {}
}
