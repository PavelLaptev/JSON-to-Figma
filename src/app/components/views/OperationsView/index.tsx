import React, {useState} from 'react';

import ViewProvider from '../ViewContext';
import {Button, RadioBtn, ElementCaption, Switcher} from '../../elements';
import {SectionWrapper} from '../../sections';

import styles from './operationsView.module.scss';

const loadedFileIcon = require('../../../assets/loaded-file-icon.svg');

const OperationsView = ({}) => {
    const FileSection = () => {
        return (
            <section className={styles.fileSection}>
                <div className={styles.fileSection_info}>
                    <img className={styles.fileSection_info_icon} src={loadedFileIcon} />
                    <p className={styles.fileSection_info_text}>Founded items</p>
                </div>
                <Button text="Reset" mod="ghost-light" />
            </section>
        );
    };

    const JSONItemsSection = () => {
        return <SectionWrapper title="JSON Items"></SectionWrapper>;
    };

    const PopulateOptionsSection = () => {
        let radioIds = ['selected-layers-only', 'by-layer-names', 'string-templates'];
        let populateMode = 'populate-mode';

        const [radioChecked, setRadioChecked] = useState(radioIds[0]);

        const handleRadioChange = e => {
            setRadioChecked(e.target.value);
        };

        return (
            <SectionWrapper title="Populate options" className={styles.mainOperations}>
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

    const AdditionalSection = () => {
        return (
            <SectionWrapper>
                <ElementCaption text="All selected items will be filled in a random order.">
                    <Switcher id="random-order-check" label="Random order" />
                </ElementCaption>
            </SectionWrapper>
        );
    };

    return (
        <ViewProvider.Consumer>
            {JSONobject => (
                <main className={styles.wrap}>
                    <FileSection />
                    <JSONItemsSection />
                    <PopulateOptionsSection />
                    <AdditionalSection />

                    <br />
                    <code style={{width: '100%'}}>{JSON.stringify(JSONobject)}</code>
                </main>
            )}
        </ViewProvider.Consumer>
    );
};

export default OperationsView;
