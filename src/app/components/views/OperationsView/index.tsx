import * as React from 'react';

import ViewProvider from '../ViewContext';
import {Button, RadioBtn} from '../../elements';

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

    const GroupSection = ({children, title}) => {
        return (
            <section>
                <h3>{title}</h3>
                {children}
            </section>
        );
    };

    const ControllerSection = ({children, text}) => {
        return (
            <section>
                <div>{children}</div>
                <p>{text}</p>
            </section>
        );
    };

    const populateMode = 'populate-mode';

    return (
        <ViewProvider.Consumer>
            {JSONobject => (
                <main className={styles.wrap}>
                    <FileSection />
                    <GroupSection title="New Title">
                        <ControllerSection text="Some Text">
                            <RadioBtn id="selected-layers-only" groupName={populateMode} />
                        </ControllerSection>
                        <ControllerSection text="Some Text">
                            <RadioBtn id="by-layer-names" groupName={populateMode} />
                        </ControllerSection>
                        <ControllerSection text="Some Text">
                            <RadioBtn id="string-templates" groupName={populateMode} />
                        </ControllerSection>
                    </GroupSection>

                    <br />
                    <hr />
                    <br />
                    <code>{JSON.stringify(JSONobject)}</code>
                </main>
            )}
        </ViewProvider.Consumer>
    );
};

export default OperationsView;
