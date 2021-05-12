import * as React from 'react';

import {SectionWrapper} from '../../../../sections';
import {Icon} from '../../../../elements';

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
    const generateState = obj => {
        return Object.keys(obj).map((item, i) => {
            if (typeof Object.values(obj)[i] === 'object') {
                return {key: item, checked: false, children: generateState(Object.values(obj)[i])};
            } else {
                return {key: item, checked: false};
            }
        });
    };

    let [stateObj, setStateObj] = React.useState(generateState(props.obj[0]));

    console.log(stateObj);

    const Checkbox: React.FunctionComponent<ItemProps> = props => {
        const [checkedState, setChecked] = React.useState(false);

        const handleClick = e => {
            if (props.nested) {
                let children = Array.from(e.target.closest('.parent').querySelectorAll('.checkbox'));
                console.log(children);
            }

            setChecked(!checkedState);
        };

        return (
            <div data-name={props.label} className={styles.checkboxWrap} onClick={handleClick}>
                <div className={`checkbox ${styles.checkbox} ${checkedState ? styles.checked : null}`}>
                    <Icon name={'tick'} />
                </div>
                <span className={styles.label}>{props.label}</span>
            </div>
        );
    };

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

        // const handleChekboxClick = e => {
        //     if (props.nested) {
        //         let children = Array.from(e.target.closest('.parent').querySelectorAll('.checkbox'));
        //         console.log(children);
        //         if (e.target.getAttribute('data-checked') === 'false') {
        //             children.forEach((item: HTMLElement) => {
        //                 item.style.background = 'rgba(255, 75, 75, 0.2)';
        //             });
        //         } else {
        //             children.forEach((item: HTMLElement) => {
        //                 item.style.background = 'none';
        //             });
        //         }
        //     }
        // };

        return (
            <div style={props.style} className={`${styles.itemWrap} nested ${props.nested ? 'parent' : false}`}>
                <div className={styles.item}>
                    <div
                        className={styles.nestedSign}
                        style={{pointerEvents: props.nested ? 'auto' : 'none'}}
                        onClick={handleFoldToggle}
                    >
                        <Icon name={props.nested ? foldIcon() : 'dot'} style={props.nested ? null : {opacity: 0.2}} />
                    </div>
                    <Checkbox label={props.label} nested={props.nested} />
                </div>
                {props.children}
            </div>
        );
    };

    const loopObject = obj => {
        return Object.keys(obj).map((item, i) => {
            // console.log(checked);

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
            <HierarchyItem nested={true} label={`${Object.keys(props.obj[0]).length} items`}>
                {loopObject(props.obj[0])}
            </HierarchyItem>
        </SectionWrapper>
    );
};

export default HierarchySection;
