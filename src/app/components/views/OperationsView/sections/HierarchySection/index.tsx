import * as React from 'react';

import {SectionWrapper} from '../../../../sections';
import {Checkbox} from '../../../../elements';

import styles from './hierarchySection.module.scss';

interface Props {
    obj: Object;
}

interface ItemProps {
    label: string;
    children?: any;
    nested?: number;
}

const HierarchySection: React.FunctionComponent<Props> = props => {
    const HierarchyItem = (props: ItemProps) => {
        return (
            <div style={{marginLeft: props.nested ? `24px` : 0}} className={styles.itemWrap}>
                <div className={styles.item}>
                    <Checkbox label={props.label} />
                </div>
                {props.children}
            </div>
        );
    };

    const loopObject = (obj, nested) => {
        // console.log(obj);

        return Object.keys(obj).map((item, i) => {
            // console.log(Object.values(obj)[i]);

            const nestedObj = () => {
                if (Array.isArray(Object.values(obj)[i]) || typeof Object.values(obj)[i] === 'object') {
                    return loopObject(Object.values(obj)[i], true);
                }
            };

            return (
                <HierarchyItem nested={nested} label={item} key={`item-${i}`}>
                    {nestedObj()}
                </HierarchyItem>
            );
        });
    };

    return <SectionWrapper className={styles.wrap}>{loopObject(props.obj[0], false)}</SectionWrapper>;
};

export default HierarchySection;
