import * as React from 'react';

import {ElementCaption, Button} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';
import {skipSign} from '../../../../../../data/skipSign';

import styles from './styles.module.scss';

interface Props {
    onSectionChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const SkipLayers: React.FC<Props> = props => {
    const addSkipSign = () => {
        parent.postMessage({pluginMessage: {type: 'add-skip-sign'}}, '*');
    };

    const removeSign = () => {
        parent.postMessage({pluginMessage: {type: 'remove-skip-sign'}}, '*');
    };

    return (
        <SectionWrapper divider className={styles.wrap} onChange={props.onSectionChange} title="Skip by special sign">
            <ElementCaption
                text={`Select layers you want to exclude for the population. The plugin will skip all layers with the special ${skipSign} sign.`}
            >
                <div className={styles.btnWrap}>
                    <Button text="Add sign" mod="OUTLINE" onClick={addSkipSign} />
                    <Button text="Remove sign" mod="OUTLINE" onClick={removeSign} />
                </div>
            </ElementCaption>
        </SectionWrapper>
    );
};

export default SkipLayers;
