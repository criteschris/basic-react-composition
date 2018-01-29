import * as React from 'react';

export interface IDropdownFieldOption {
    key: string;
    text: string;
}

export interface IDropdownFieldProps {
    label: string;
    selectedKey: string | number;
    options: IDropdownFieldOption[];
    onChanged: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default (props: IDropdownFieldProps) => {
    return (
        <div className='field-group'>
            <div className='field-label'>
                <label>{props.label}</label>
            </div>
            <select onChange={props.onChanged} >
                {props.options.map(o => <option key={o.key} value={o.key}>{o.text}</option>)}
            </select>
        </div>
    );
};