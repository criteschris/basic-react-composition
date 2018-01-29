import * as React from 'react';

export interface IMultilineTextFieldProps {
    label: string;
    value: string;
    onChanged: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default (props: IMultilineTextFieldProps) => {
    return (
        <div className='field-group'>
            <div className='field-label'>
                <label>{props.label}</label>
            </div>
            <textarea rows={6} value={props.value} onChange={props.onChanged} />
        </div>
    );
};