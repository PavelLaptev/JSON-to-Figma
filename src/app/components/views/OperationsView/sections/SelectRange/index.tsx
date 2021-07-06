import * as React from 'react';

import {ElementCaption, Input} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';

import styles from './styles.module.scss';

interface Props {
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
    value?: string;
    error?: boolean;
}

const SelectRange: React.FC<Props> = props => {
    return (
        <SectionWrapper className={styles.wrap} divider onChange={props.onChange} title="Restrict range">
            <ElementCaption
                text={`If you want to select a certain range from a JSON, you can do it like this “1-10”, “1, 5, 20”, or combine them “1-10, 21, 50-340”.`}
            >
                <div className={styles.inputWrap}>
                    <Input className={`${props.error ? styles.inputError : ''} ${styles.input}`} value={props.value} />
                    {props.error ? <span className={styles.errorCaption}>Invalid range format</span> : null}
                </div>
            </ElementCaption>
        </SectionWrapper>
    );
};

SelectRange.defaultProps = {
    onChange: () => {},
    value: '',
    error: false,
} as Partial<Props>;

export default SelectRange;
