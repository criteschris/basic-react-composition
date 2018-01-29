import * as React from 'react';
import { curry } from 'ramda';

export interface IDropdownFieldOption {
    key: string;
    text: string;
}

export default curry(
    (
        label: string,
        options: IDropdownFieldOption[],
        onChanged: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
        selectedKey: string
    ) => {
        return (
            <div className='field-group'>
                <div className='field-label'>
                    <label>{label}</label>
                </div>
                <select value={selectedKey} onChange={onChanged} >
                    {options.map(o => <option key={o.key} value={o.key}>{o.text}</option>)}
                </select>
            </div>
        );
    }
);