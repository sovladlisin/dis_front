import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClass } from '../../actions/graph/graph';
import { TNode, TNodeData, TPattern, TPatternNode } from '../../actions/graph/types';
import { RootStore } from '../../store';
import { CLASS, getNodeLabel, useOnClickOutside } from '../../utils';
import ClassForm from '../Forms/ClassForm';

interface INodeMenuProps {
  node: TNode,
  onClose: () => void
}

const NodeMenu: React.FunctionComponent<INodeMenuProps> = (props) => {

  const dispatch = useDispatch()
  const name = getNodeLabel(props.node)

  const class_check = props.node.data.labels.includes(CLASS)

  const patterns = useSelector((state: RootStore) => state.graph.patterns)

  const [localPatterns, setLocalPatterns] = React.useState<TPattern[]>([])

  React.useEffect(() => {
    setLocalPatterns(patterns.filter(p => {
      if (p.target_nodes && p.target_nodes.map(t_n => t_n.data.uri).includes(props.node.data.uri)) {
        return true
      }
      return false
    }))
  }, [, patterns])

  const locked = !props.node.data.labels.includes(props.node.data.ontology_uri)


  return <>
    <div className='node-context-menu-background' onClick={_ => props.onClose()}></div>
    <div className='node-context-menu'>
      {class_check && <>
        <button onClick={_ => props.node.data.onCreateSubClass(props.node.data.uri)}><i className='fas fa-plus color-green'></i><p>Добавить подкласс</p></button>
        <button onClick={_ => props.node.data.onCreateObject(props.node.data.uri)}><i className='fas fa-plus color-green'></i><p>Добавить объект</p></button>


      </>}

      {localPatterns.map(p => {
        return <button onClick={_ => props.node.data.onApplyPattern(props.node, p)}><i className='fas fa-project-diagram'></i><p>{p.name}</p></button>
      })}

      {!locked && <>
        <button onClick={_ => props.node.data.onEdit(props.node.data.uri)}><i className='fas fa-cog color-blue'></i><p>Редактировать</p></button>
        <button onClick={_ => props.node.data.onDelete(props.node.data.uri)}><i className='fas fa-trash color-red'></i><p>Удалить</p></button>
      </>}
    </div>


  </>;
};

export default NodeMenu;
