import * as React from 'react';

import {Switcher} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

interface Props {
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const ManualPopulation: React.FC<Props> = props => {
    return (
        <SectionWrapper divider title="Manual population" onChange={props.onChange}>
            <Switcher
                id="manual-population"
                label="Select layers you want to fill out and hit the desired key-button."
            />
        </SectionWrapper>
    );
};

ManualPopulation.defaultProps = {
    onChange: () => {},
} as Partial<Props>;

export default ManualPopulation;
