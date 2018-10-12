import * as React from 'react';

import { Handler, ReQuContext } from './types';
import {withReQu} from './withReQu';


class TimeoutBase extends React.PureComponent<{handler: Handler, delay: number} & ReQuContext> {
    static defaultProps = {
        delay: 1000
    };
    componentDidMount() {
        this.props.registerHandler(this.props.handler, {delay: this.props.delay});
    }
    componentWillUnmount() {
        this.props.removeHandler(this.props.handler);
    }
};

export const Timeout = withReQu(TimeoutBase);