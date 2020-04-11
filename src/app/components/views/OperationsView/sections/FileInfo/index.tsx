import * as React from 'react';

import {Button} from '../../../../elements';

import styles from './fileSection.module.scss';
const loadedFileIcon = require('../../../../../assets/loaded-file-icon.svg');

interface Props {
    obj: Array<any>;
    onResetClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

const FileSection: React.SFC<Props> = props => {
    let amountOfKeys = Object.keys(props.obj[0]).length;
    let amountOfItems = props.obj.length;

    return (
        <section className={styles.wrap}>
            <div className={styles.info}>
                <img className={styles.infoIcon} src={loadedFileIcon} />
                <p className={styles.text}>
                    Found <span>{amountOfKeys} keys</span> of <span>{amountOfItems} items</span>
                </p>
            </div>
            <Button text="Reset" mod="ghost-light" onClick={props.onResetClick} />
        </section>
    );
};

export default FileSection;
