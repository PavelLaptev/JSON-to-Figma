import * as React from 'react';

import {Switcher, ElementCaption} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

interface Props {}

const ExtraOptions: React.SFC<Props> = () => {
    return (
        <SectionWrapper>
            <ElementCaption text="All selected items will be filled in a random order.">
                <Switcher id="random-order-check" label="Random order" />
            </ElementCaption>
        </SectionWrapper>
    );
};

export default ExtraOptions;
