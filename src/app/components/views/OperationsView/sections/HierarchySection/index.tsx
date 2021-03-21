import * as React from 'react';

import {SectionWrapper} from '../../../../sections';
import {Checkbox, Icon} from '../../../../elements';

import styles from './hierarchySection.module.scss';

interface Props {
    obj: Object;
}

interface ItemProps {
    label: string;
    children?: any;
    nested?: boolean;
}

const HierarchySection: React.FunctionComponent<Props> = props => {
    // const [itemFoldedState, setItemFoldedState] = React.useState(false);

    const HierarchyItem = (props: ItemProps) => {
        return (
            <div style={{marginLeft: props.nested ? `24px` : 0}} className={styles.itemWrap}>
                <div className={styles.item}>
                    <div className={styles.nestedSign}>
                        <Icon name={props.nested ? 'minus' : 'dot'} />
                    </div>
                    <Checkbox label={props.label} />
                </div>
                {props.children}
            </div>
        );
    };

    const loopObject = obj => {
        // console.log(obj);

        return Object.keys(obj).map((item, i) => {
            if (typeof Object.values(obj)[i] === 'object') {
                return (
                    <HierarchyItem nested={true} label={item} key={`item-${i}`}>
                        {loopObject(Object.values(obj)[i])}
                    </HierarchyItem>
                );
            } else {
                return <HierarchyItem nested={false} label={item} key={`item-${i}`}></HierarchyItem>;
            }
        });
    };

    return <SectionWrapper className={styles.wrap}>{loopObject(props.obj[0])}</SectionWrapper>;
};

export default HierarchySection;
