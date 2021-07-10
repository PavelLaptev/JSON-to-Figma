import * as React from 'react';

import {Switcher} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

interface Props {
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const RandomSwitcher: React.FC<Props> = props => {
    return (
        <SectionWrapper divider title="Random order" onChange={props.onChange}>
            <Switcher id="random-order-check" label="Fill Selected items in random order." />
        </SectionWrapper>
    );
};

RandomSwitcher.defaultProps = {
    onChange: () => {},
} as Partial<Props>;

export default RandomSwitcher;
