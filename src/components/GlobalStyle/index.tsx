import type { ReactNode, ReactElement } from "react";
import './GlobalStyle.scss'

type GlobalStyleProps = {
  children: ReactNode;
};

function GlobalStyle({ children }: GlobalStyleProps): ReactElement {
  return <>{children}</>;
}

export default GlobalStyle;
