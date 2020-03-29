import React, {useState} from 'react';

import {ElementCaption, RadioBtn} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './optionsSection.module.scss';

interface Props {}

const OptionsSection: React.SFC<Props> = () => {
    let radioIds = ['selected-layers-only', 'by-layer-names', 'string-templates'];
    let populateMode = 'populate-mode';

    const [radioChecked, setRadioChecked] = useState(radioIds[0]);

    const handleRadioChange = e => {
        setRadioChecked(e.target.value);
    };

    return (
        <SectionWrapper title="Populate options" className={styles.wrap}>
            <ElementCaption text="Replaces text only for directly selected text layers.">
                <RadioBtn
                    id={radioIds[0]}
                    groupName={populateMode}
                    label="Selected layers only"
                    checked={radioChecked === radioIds[0]}
                    onChange={handleRadioChange}
                />
            </ElementCaption>
            <ElementCaption text="You can populate layers deeply nested in any group or frame. To do so, manually rename the layer you want to populate so that it matches the name in the JSON file.">
                <RadioBtn
                    id={radioIds[1]}
                    groupName={populateMode}
                    label="By layer names"
                    checked={radioChecked === radioIds[1]}
                    onChange={handleRadioChange}
                />
            </ElementCaption>
            <ElementCaption text="Select frames or groups that contents text layers with string templates. Replaces only the contents of a string in {braces}.">
                <RadioBtn
                    id={radioIds[2]}
                    groupName={populateMode}
                    label="String templates"
                    checked={radioChecked === radioIds[2]}
                    onChange={handleRadioChange}
                />
            </ElementCaption>
        </SectionWrapper>
    );
};

export default OptionsSection;
