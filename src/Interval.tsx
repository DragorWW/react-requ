import * as React from 'react';

import { Handler, ReQuContext } from './types';
import {withReQu} from './withReQu';


class IntervalBase extends React.PureComponent<{handler: Handler, interval: number} & ReQuContext> {
    static defaultProps = {
        interval: 1000
    };
    componentDidMount() {
        this.props.registerHandler(this.props.handler, {interval: this.props.interval});
    }
    componentWillUnmount() {
        this.props.removeHandler(this.props.handler);
    }
};

export const Interval = withReQu(IntervalBase);