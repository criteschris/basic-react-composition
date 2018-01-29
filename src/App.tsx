import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { assoc } from 'ramda';

import TextField from './components/TextField';
import DropdownField, { IDropdownFieldOption } from './components/DropdownField';
import MultilineTextField from './components/MultilineTextField';

import { ITask } from './types';
import './App.css';

export interface IAppProps { }
export interface IAppState {
    task: ITask;
    statusOptions: IDropdownFieldOption[];
}

export class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            task: {
                id: 1,
                title: '',
                description: '',
                status: '1'
            } as ITask,
            statusOptions: [
                { key: '1', text: 'Not Started' },
                { key: '2', text: 'In Progress' },
                { key: '3', text: 'Delayed' },
                { key: '4', text: 'Complete' }
            ]
        };

        this._onTitleChanged = this._onTitleChanged.bind(this);
        this._onDescriptionChanged = this._onDescriptionChanged.bind(this);
        this._onStatusChanged = this._onStatusChanged.bind(this);
    }

    private _onTitleChanged(ev: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ task: assoc('title', ev.currentTarget.value, this.state.task) });
    }

    private _onDescriptionChanged(ev: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ task: assoc('description', ev.currentTarget.value, this.state.task) });
    }

    private _onStatusChanged(ev: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ task: assoc('status', ev.currentTarget.value, this.state.task) });
    }

    public render() {
        return (
            <div className='container'>
                <div className='header'>Task Form</div>
                <TextField label='Title' value={this.state.task.title} onChanged={this._onTitleChanged} />
                <DropdownField label='Status' selectedKey={this.state.task.status} options={this.state.statusOptions} onChanged={this._onStatusChanged} />
                <MultilineTextField label='Description' value={this.state.task.description} onChanged={this._onDescriptionChanged} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app-host'));