import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { decode } from '../../utils'
import Graph from './Graph'


interface IGraphLinkedProps {
    uri: string,
}

const GraphLinked: React.FunctionComponent<IGraphLinkedProps> = ({ match }: RouteComponentProps<IGraphLinkedProps>) => {
    const ontology_uri: string = decode(match.params.uri)
    console.log('ontology_uri', ontology_uri)

    return <div className='graph-main-container-linked'><Graph uri={ontology_uri} /></div>


}

export default GraphLinked