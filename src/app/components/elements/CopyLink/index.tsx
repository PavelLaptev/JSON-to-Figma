import * as React from 'react';
// import {formatSuccessMessage} from '@create-figma-plugin/utilities';

import styles from './copylink.module.scss';

interface Props {
    text?: string;
    link?: string;
}

const CopyLink: React.SFC<Props> = props => {
    const copyToClipboard = (text: string): void => {
        figma.notify('message', {
            timeout: 60000,
        });
        console.log(text);
    };

    return (
        <span className={styles.copyLink} onClick={() => copyToClipboard('sd')}>
            {props.text}
        </span>
    );
};

CopyLink.defaultProps = {
    text: 'Hallo',
    link: '',
};

export default CopyLink;
