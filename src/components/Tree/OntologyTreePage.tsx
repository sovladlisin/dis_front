import * as React from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom'
import OntologyTree from './OntologyTree';
import { decode } from '../../utils';

interface IOntologyTreePageProps {
    uri: string
}

const OntologyTreePage: React.FunctionComponent<IOntologyTreePageProps> = ({ match }: RouteComponentProps<IOntologyTreePageProps>) => {
    const ontology_uri: string = decode(match.params.uri)



    return <>
        <OntologyTree uri={ontology_uri} />
    </>;
};

export default OntologyTreePage;
