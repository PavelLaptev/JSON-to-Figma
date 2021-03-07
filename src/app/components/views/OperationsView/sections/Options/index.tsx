import * as React from 'react';

import {ElementCaption, RadioBtn} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

interface Props {
    array: Array<any>;
    groupName: string;
    defaultRadio: string;
    onSectionChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const OptionsSection: React.SFC<Props> = props => {
    const [radioChecked, setRadioChecked] = React.useState(props.defaultRadio);

    const handleRadioChange = e => {
        setRadioChecked(e.target.value);
    };

    const radioButtons = () => {
        return props.array.map(i => {
            return (
                <ElementCaption key={i.id} text={i.captionText}>
                    <RadioBtn
                        id={i.id}
                        groupName={props.groupName}
                        label={i.label}
                        checked={radioChecked === i.id}
                        onChange={handleRadioChange}
                    />
                </ElementCaption>
            );
        });
    };

    return (
        <SectionWrapper title="Populate by" onChange={props.onSectionChange}>
            {radioButtons()}
        </SectionWrapper>
    );
};

export default OptionsSection;
