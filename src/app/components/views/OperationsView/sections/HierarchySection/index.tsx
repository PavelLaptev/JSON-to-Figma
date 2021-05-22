import * as React from 'react';

import {SectionWrapper} from '../../../../sections';
// import {Icon} from '../../../../elements';

import styles from './hierarchySection.module.scss';

interface Props {
    obj: Object;
}

// interface ItemProps {
//     label: string;
//     children?: any;
//     nested?: boolean;
//     style?: React.CSSProperties;
//     checked?: boolean;
// }

const generateObjState = (obj, parentName = '') => {
    return Object.keys(obj).map((item, i) => {
        if (typeof Object.values(obj)[i] === 'object') {
            let keyName = `${parentName}.${item}`;
            return {
                key: item,
                fullKey: keyName,
                checked: false,
                folded: false,
                children: generateObjState(Object.values(obj)[i], keyName),
            };
        } else {
            return {key: item, fullKey: `${parentName}.${item}`, checked: false, children: [], folded: false};
        }
    });
};

const HierarchySection: React.FunctionComponent<Props> = props => {
    let [stateObj] = React.useState(generateObjState(props.obj[0]));
    // console.log(stateObj);

    const Checkbox = props => {
        const handleonchange = () => {};

        return (
            <section className={styles.checkboxSection}>
                <div className={styles.checkboxWrap}>
                    <input
                        type="checkbox"
                        onChange={handleonchange}
                        id={props.id}
                        name={props.label}
                        checked={props.checked}
                    />
                    <label htmlFor={props.id}>{props.label}</label>
                </div>
                {props.children}
            </section>
        );
    };

    const loopObject = obj => {
        return obj.map((item, i) => {
            if (item.children.length > 0) {
                return (
                    <Checkbox checked={item.checked} label={item.fullKey} key={`item-${i}`}>
                        {loopObject(item.children)}
                    </Checkbox>
                );
            } else {
                return <Checkbox checked={item.checked} label={item.fullKey} key={`item-${i}`} />;
            }
        });
    };

    return (
        <SectionWrapper className={styles.wrap}>
            <Checkbox style={{marginLeft: 0}}>{loopObject(stateObj)}</Checkbox>
        </SectionWrapper>
    );
};

export default HierarchySection;
