import { FC, SVGProps } from 'react';

type Styles = Record<string, string>;

declare module '*.svg' {
  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;

  const content: string;
  export default content;
}

// declare module './images/*.png' {
//   const content: string;
//   export default content;
// }

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: Styles;
  export default content;
}

declare module '*.sass' {
  const content: Styles;
  export default content;
}

declare module '*.css' {
  const content: Styles;
  export default content;
}
