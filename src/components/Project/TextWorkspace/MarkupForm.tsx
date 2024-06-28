import * as React from 'react';
import { useDispatch } from 'react-redux';
import { createMarkup, editMarkup } from '../../../actions/markup/markup';
import { TMarkup } from '../../../actions/markup/types';
import { useOnClickOutside } from '../../../utils';

interface IMarkupFormProps {
    markup: TMarkup,
    onClose: () => void
}

const MarkupForm: React.FunctionComponent<IMarkupFormProps> = (props) => {
    const dispatch = useDispatch()

    const [newMarkup, setNewMarkup] = React.useState<TMarkup>(props.markup)
    React.useEffect(() => setNewMarkup(props.markup), [, props.markup])

    const ref = React.useRef()
    useOnClickOutside(ref, _ => props.onClose())

    const onSave = () => {
        if (newMarkup.id === -1) {
            dispatch(createMarkup(newMarkup))
        }
        else {
            dispatch(editMarkup(newMarkup.name, newMarkup.id))
        }
        props.onClose()
    }

    return <>
        <div className="ws-markup-form" ref={ref}>
            <input value={newMarkup.name} onChange={e => setNewMarkup({ ...newMarkup, name: e.target.value })}></input>
            <button onClick={onSave}>Сохранить разметку</button>
        </div>
    </>;
};

export default MarkupForm;
