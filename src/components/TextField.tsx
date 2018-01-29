import * as React from 'react';

export interface ITextFieldProps {
    label: string;
    value: string;
    onChanged: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

export default (props: ITextFieldProps) => {
    return (
        <div className='field-group'>
            <div className='field-label'>
                <label>{props.label}</label>
            </div>
            <input type='text' value={props.value} onChange={props.onChanged} />
        </div>
    );
};