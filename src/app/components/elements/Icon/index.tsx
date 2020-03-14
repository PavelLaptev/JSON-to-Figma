import * as React from 'react';

import styles from './icon.module.scss';

interface Props {
    name?: string;
}

const iconsData = {
    copy:
        'M8 1.5A2.5 2.5 0 005.5 4v1.5H4A2.5 2.5 0 001.5 8v4A2.5 2.5 0 004 14.5h4a2.5 2.5 0 002.5-2.5v-1.5H12A2.5 2.5 0 0014.5 8V4A2.5 2.5 0 0012 1.5H8zm2.5 8H12A1.5 1.5 0 0013.5 8V4A1.5 1.5 0 0012 2.5H8A1.5 1.5 0 006.5 4v1.5H8A2.5 2.5 0 0110.5 8v1.5zM2.5 8A1.5 1.5 0 014 6.5h4A1.5 1.5 0 019.5 8v4A1.5 1.5 0 018 13.5H4A1.5 1.5 0 012.5 12V8z',
};

const Icon: React.SFC<Props> = props => {
    return (
        <i className={styles.wrap}>
            <svg width="100%" height="100%" viewBox="0 0 1024 1024" fill={'fff'}>
                <path d={iconsData[props.name]} />
            </svg>
        </i>
    );
};

Icon.defaultProps = {
    name: 'copy',
} as Partial<Props>;

export default Icon;
