import * as React from 'react' ;
import { shallow } from 'enzyme';
import {ReQuProvider, Consumer} from '../src/ReQu';

it('', () => {
    const comp = shallow(<ReQuProvider>
        <Consumer />
    </ReQuProvider>)
})