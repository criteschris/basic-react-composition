import * as React from 'react';
import { curry } from 'ramda';

export default curry(
    (
        label: string,
        onChanged: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void,
        value: string
    ) => {
        return (
            <div className='field-group'>
                <div className='field-label'>
                    <label>{label}</label>
                </div>
                <textarea rows={6} value={value} onChange={onChanged} />
            </div>
        );
    }
);