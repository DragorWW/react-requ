import * as React from "react";

import { ReQuContext } from "./types";
import { getDisplayName } from "./helpers";
import { Consumer } from "./ReQu";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

export function withReQu<P extends object>(
  WrappedComponent: React.ComponentType<P & ReQuContext>
) {
  return class extends React.PureComponent<Subtract<P, ReQuContext>> {
    static displayName = `withReQu(${getDisplayName(WrappedComponent)})`;
    render() {
      return (
        <Consumer>
          {({ registerHandler, removeHandler }) => (
            <WrappedComponent
              {...this.props}
              registerHandler={registerHandler}
              removeHandler={removeHandler}
            />
          )}
        </Consumer>
      );
    }
  };
}
