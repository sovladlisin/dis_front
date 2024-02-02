import * as React from 'react';
import ReactLoading from "react-loading";

interface ILoadingProps {
    height: number,
    inner_height?: number,
    inner_width?: number,

}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
    return <div style={{ position: 'relative', height: props.height + 'px', display: 'grid', justifyContent: 'center', justifyItems: 'center' }}>

        <ReactLoading
            type={'spin'}
            color="#4d75a3"
            height={props.inner_height ? props.inner_height : 32}
            width={props.inner_width ? props.inner_width : 32}
            className='m-loading-new-block' />
    </div>;
};

export default Loading;
