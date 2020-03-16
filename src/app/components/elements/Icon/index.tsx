import * as React from 'react';

import styles from './icon.module.scss';

interface Props {
    name?: string;
    color?: string;
}

const iconsData = {
    copy:
        'M512 96c-88.365 0-160 71.635-160 160v96h-96c-88.365 0-160 71.635-160 160v256c0 88.365 71.635 160 160 160h256c88.365 0 160-71.635 160-160v-96h96c88.365 0 160-71.635 160-160v-256c0-88.365-71.635-160-160-160h-256zM672 608v-96c0-88.365-71.635-160-160-160h-96v-96c0-53.020 42.98-96 96-96h256c53.018 0 96 42.98 96 96v256c0 53.020-42.982 96-96 96h-96zM160 512c0-53.020 42.98-96 96-96h256c53.020 0 96 42.98 96 96v256c0 53.018-42.98 96-96 96h-256c-53.020 0-96-42.982-96-96v-256z',
    upload:
        'M480 265.638v438.362h64v-438.362l202.163 188.688 43.674-46.787-277.837-259.312-277.834 259.312 43.668 46.787 202.166-188.688z M224 832v-128h-64v128c0 53.018 42.98 96 96 96h512c53.018 0 96-42.982 96-96v-128h-64v128c0 17.67-14.33 32-32 32h-512c-17.673 0-32-14.33-32-32z',
};

const Icon: React.SFC<Props> = props => {
    return (
        <i className={styles.wrap}>
            <svg width="100%" height="100%" viewBox="0 0 1024 1024" fill={props.color}>
                <path d={iconsData[props.name]} />
            </svg>
        </i>
    );
};

Icon.defaultProps = {
    name: 'copy',
    color: '#000',
} as Partial<Props>;

export default Icon;
