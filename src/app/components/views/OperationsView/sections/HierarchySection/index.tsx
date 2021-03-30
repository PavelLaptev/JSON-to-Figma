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
    style?: React.CSSProperties;
}

const HierarchySection: React.FunctionComponent<Props> = props => {
    // let myRef = React.createRef();

    // React.useEffect(() => {

    // })

    const HierarchyItem = (props: ItemProps) => {
        const [itemFoldedState, setItemFoldedState] = React.useState(false);

        const handleFoldToggle = e => {
            let itemChildren = [...e.target.closest('.nested').childNodes].filter((_, i) => i !== 0);
            itemChildren.forEach(item => {
                item.style.display = itemFoldedState ? 'flex' : 'none';
            });
            setItemFoldedState(!itemFoldedState);
        };

        const foldIcon = () => {
            return itemFoldedState ? 'folder-closed' : 'folder-open';
        };

        return (
            <div style={props.style} className={`${styles.itemWrap} nested`}>
                <div className={styles.item}>
                    <div
                        className={styles.nestedSign}
                        style={{pointerEvents: props.nested ? 'auto' : 'none'}}
                        onClick={handleFoldToggle}
                    >
                        <Icon name={props.nested ? foldIcon() : 'dot'} style={props.nested ? null : {opacity: 0.2}} />
                    </div>
                    <Checkbox label={props.label} />
                </div>
                {props.children}
            </div>
        );
    };

    const loopObject = obj => {
        return Object.keys(obj).map((item, i) => {
            let isNested = typeof Object.values(obj)[i] === 'object';
            if (isNested) {
                return (
                    <HierarchyItem
                        nested={true}
                        label={item}
                        key={`item-${i}`}
                        style={{marginLeft: isNested ? `24px` : 0}}
                    >
                        {loopObject(Object.values(obj)[i])}
                    </HierarchyItem>
                );
            } else {
                return (
                    <HierarchyItem
                        nested={false}
                        style={{marginLeft: !isNested ? `24px` : 0}}
                        label={item}
                        key={`item-${i}`}
                    />
                );
            }
        });
    };

    return (
        <SectionWrapper className={styles.wrap}>
            {
                <HierarchyItem nested={true} label={`${Object.keys(props.obj[0]).length} items`}>
                    {loopObject(props.obj[0])}
                </HierarchyItem>
            }
        </SectionWrapper>
    );
};

export default HierarchySection;
