import * as React from 'react';
import { LANGUAGES } from '../../actions/settings/types';

interface ILabelFormProps {
    label: string[],
    onChange: (label: string[]) => void,
    title?: string
}

const LabelForm: React.FunctionComponent<ILabelFormProps> = (props) => {

    React.useEffect(() => {
        if (!props.label) return;
        convertLabelToInput(props.label)
    }, [, props.label])

    const convertLabelToInput = (label: string[]) => {
        var input_local = {}
        label.map(l => {
            const lang = l.split('@')[1]
            const str = l.split('@')[0]
            input_local[lang] = str
        })
        setInput(input_local)
    }

    const convertInputToLabel = (input: { [lang: string]: string }) => {
        var label_local = []
        Object.keys(input).map(lang => {
            const str = input[lang]
            label_local.push(str + '@' + lang)
        })
        props.onChange(label_local)
    }

    const [input, setInput] = React.useState<{ [lang: string]: string }>()


    return <>
        <label>{props.title || 'Название'}</label>
        <div className='label-form'>
            {input && <>
                {Object.keys(LANGUAGES).map(lang => {
                    return <>
                        <label>{lang}</label>
                        <input placeholder='...' value={input[lang]} onChange={e => convertInputToLabel({ ...input, [lang]: e.target.value })}></input>
                    </>
                })}
            </>}
        </div>

    </>;
};

export default LabelForm;
