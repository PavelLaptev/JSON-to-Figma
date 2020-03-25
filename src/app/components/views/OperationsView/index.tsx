import * as React from 'react';

import ViewProvider from '../ViewContext';
import {Button, RadioBtn, ElementCaption} from '../../elements';
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

    const populateMode = 'populate-mode';

    return (
        <ViewProvider.Consumer>
            {JSONobject => (
                <main className={styles.wrap}>
                    <FileSection />

                    <SectionWrapper title="JSON Items"></SectionWrapper>

                    <SectionWrapper title="Populate options" className={styles.mainOperations}>
                        <ElementCaption text="Replaces text only for directly selected text layers.">
                            <RadioBtn id="selected-layers-only" groupName={populateMode} label="Selected layers only" />
                        </ElementCaption>
                        <ElementCaption text="You can populate layers deeply nested in any group or frame. To do so, manually rename the layer you want to populate so that it matches the name in the JSON file.">
                            <RadioBtn id="by-layer-names" groupName={populateMode} label="By layer names" />
                        </ElementCaption>
                        <ElementCaption text="Select frames or groups that contents text layers with string templates. Replaces only the contents of a string in {braces}.">
                            <RadioBtn id="string-templates" groupName={populateMode} label="String templates" />
                        </ElementCaption>
                    </SectionWrapper>

                    <SectionWrapper>
                        <ElementCaption text="Select frames or groups that contents text layers with string templates. Replaces only the contents of a string in {braces}.">
                            <RadioBtn id="string-templates" groupName={populateMode} label="String templates" />
                        </ElementCaption>
                    </SectionWrapper>

                    <br />
                    <hr />
                    <br />
                    <code style={{width: '100%'}}>{JSON.stringify(JSONobject)}</code>
                </main>
            )}
        </ViewProvider.Consumer>
    );
};

export default OperationsView;
