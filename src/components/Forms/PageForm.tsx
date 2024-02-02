import * as React from 'react';
import { useOnClickOutside } from '../../utils';
import { TPage, TProject } from '../../actions/projects/types';
import { useDispatch } from 'react-redux';
import { createPage, updatePage } from '../../actions/projects/projects';

interface IPageFormProps {
    page?: TPage,
    project: TProject,
    onClose: () => void
}

const PageForm: React.FunctionComponent<IPageFormProps> = (props) => {
    const dispatch = useDispatch()

    const defaultPage: TPage = {
        name: '',
        blocks: [],
        data: {},
        project_id: props.project.id
    }

    const [page, setPage] = React.useState<TPage>(props.page ? props.page : defaultPage)

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const onSave = () => {
        page.id ? dispatch(updatePage(page)) : dispatch(createPage(page))
    }

    return <>
        <div className='m-form' ref={ref}>
            <p className='m-form-title'>Новая страница</p>
            <div className='m-form-fields'>
                <label>Название</label>
                <input placeholder='...' value={page.name} onChange={e => setPage({ ...page, name: e.target.value })}></input>
            </div>
            <div className='m-form-controls'>
                <button className='bg-blue' onClick={onSave}>Сохранить</button>
                <button className='bg-red' onClick={props.onClose}>Отмена</button>
            </div>
        </div>

    </>;
};

export default PageForm;
