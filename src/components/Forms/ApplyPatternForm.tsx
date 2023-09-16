import * as React from 'react';
import { TNode, TPattern } from '../../actions/graph/types';
import { checkPatternOnSelectNode, readLabel, useOnClickOutside } from '../../utils';
import ItemSelectorButton from './ItemSelectorButton';
import LabelForm from './LabelForm';

interface IApplyPatternFormProps {
    pattern: TPattern,
    node: TNode,
    onApply: (pattern: TPattern) => void,
    onClose: () => void,
    ontology_uri: string
}

const ApplyPatternForm: React.FunctionComponent<IApplyPatternFormProps> = (props) => {


    const [pattern, setPattern] = React.useState({ ...props.pattern })

    const ref = React.useRef()
    useOnClickOutside(ref, props.onClose)

    const apply = () => {
        props.onApply({
            ...pattern, nodes: pattern.nodes.map(n => {
                if (n.data.is_main)
                    n.data.is_main_uri = props.node.data.uri
                return n
            })
        })
    }

    return <>
        <div className='graph-apply-pattern-form' ref={ref}>
            <p className='graph-apply-pattern-form-title'></p>

            <div className='graph-apply-pattern-form-sections'>


                {pattern.nodes.filter(node => node.data.is_create).length > 0 &&
                    <>
                        <p className='graph-apply-pattern-form-section-name'>
                            Создание
                        </p>
                        <div className='graph-apply-pattern-form-fields'>
                            {pattern.nodes.filter(node => node.data.is_create).map(node => {
                                return <>
                                    <LabelForm title={readLabel(node.data.field_name)} label={node.data.is_create_label} onChange={label => setPattern({
                                        ...pattern, nodes: pattern.nodes.map(n => {
                                            if (n.id === node.id) {
                                                n.data.is_create_label = label
                                            }
                                            return n
                                        })
                                    })} />
                                </>
                            })}
                        </div>
                    </>
                }


                {pattern.nodes.filter(node => node.data.is_select).length > 0 && <>
                    <p className='graph-apply-pattern-form-section-name'>
                        Выбор
                    </p>
                    <div className='graph-apply-pattern-form-fields'>
                        {pattern.nodes.filter(node => node.data.is_select).map(node => {

                            const custom_q = checkPatternOnSelectNode(node, props.pattern)
                            return <>
                                <ItemSelectorButton
                                    custom_q={custom_q}
                                    selected={node.data.is_select_node}
                                    onChange={(node_change: TNode) => {
                                        setPattern({
                                            ...pattern, nodes: pattern.nodes.map(n => {
                                                if (n.id === node.id)
                                                    n.data.is_select_node = node_change
                                                return n
                                            })
                                        })
                                    }}
                                    ontology_uri={props.ontology_uri}
                                    labels={[node.data.tag]}
                                    title={readLabel(node.data.field_name)} />
                            </>
                        })}
                    </div>
                </>}
            </div>
            <div className='graph-apply-pattern-form-buttons'>
                <button className='bg-blue' onClick={apply}>Применить</button>
                <button className='bg-red' onClick={props.onClose}>Отмена</button>
            </div>
        </div>
    </>;
};

export default ApplyPatternForm;
