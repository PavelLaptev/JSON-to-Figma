import * as React from 'react';

import styles from './copylink.module.scss';

const CopyLink = () => {
    const copyToClipboard = (text: string): void => {
        console.log(text);
    };

    return <span onClick={() => copyToClipboard('sd')}>structture</span>;
};

export default CopyLink;
