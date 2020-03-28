import * as React from 'react';

import {Button} from '../../../../elements';

import styles from './fileSection.module.scss';
const loadedFileIcon = require('../../../../../assets/loaded-file-icon.svg');

interface Props {
    obj: Object;
}

const FileSection: React.SFC<Props> = props => {
    let amountOfItems = Object.keys(props.obj[0]).length;
    console.log(amountOfItems);

    return (
        <section className={styles.wrap}>
            <div className={styles.info}>
                <img className={styles.infoIcon} src={loadedFileIcon} />
                <p className={styles.text}>
                    Founded <span>{amountOfItems} items</span>
                </p>
            </div>
            <Button text="Reset" mod="ghost-light" />
        </section>
    );
};

export default FileSection;
