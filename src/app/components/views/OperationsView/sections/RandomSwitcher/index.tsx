import * as React from 'react';

import {Switcher, ElementCaption} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

interface Props {
    onSectionChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const RandomSwitcher: React.SFC<Props> = props => {
    return (
        <SectionWrapper onChange={props.onSectionChange}>
            <ElementCaption text="All selected items will be filled in a random order.">
                <Switcher id="random-order-check" label="Random order" />
            </ElementCaption>
        </SectionWrapper>
    );
};

export default RandomSwitcher;
