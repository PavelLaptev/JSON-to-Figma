import * as React from 'react';

import {showMsg, execCopy} from '../../../utils';

import styles from './copylink.module.scss';

interface Props {
    text: string;
    link: string;
    className?: any;
}

const CopyLink: React.SFC<Props> = props => {
    const copyToClipboard = (link: string): void => {
        execCopy(link);
        showMsg('copy', 'Link copied to Clipboard');
    };

    return (
        <span className={`${styles.copyLink} ${props.className}`} onClick={() => copyToClipboard(props.link)}>
            {props.text}
        </span>
    );
};

export default CopyLink;
