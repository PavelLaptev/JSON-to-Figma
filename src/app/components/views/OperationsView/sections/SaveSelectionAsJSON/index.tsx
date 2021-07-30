import * as React from 'react';

import {Button, ElementCaption} from '../../../../elements';

import {SectionWrapper} from '../../../../sections';

interface Props {
    onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

const SaveSelectionAsJSON: React.FC<Props> = props => {
    return (
        <SectionWrapper divider title="Save selection to JSON file">
            <ElementCaption text={`Select the elements you want to save as JSON`}>
                <div>
                    <Button text="Save to JSON file" mod="OUTLINE" onClick={props.onClick} />
                </div>
            </ElementCaption>
        </SectionWrapper>
    );
};

SaveSelectionAsJSON.defaultProps = {
    onClick: e => {
        console.log('onClick', e);
    },
} as Partial<Props>;

export default SaveSelectionAsJSON;
