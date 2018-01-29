import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { assoc, compose, juxt, prop } from 'ramda';

import TextField from './composibleComponents/CurriedTextField';
import DropdownField, { IDropdownFieldOption } from './composibleComponents/CurriedDropdownField';
import MultilineTextField from './composibleComponents/CurriedMultilineTextField';

import { ITask } from './types';
import './App.css';

export interface IAppProps { }
export interface IAppState {
    task: ITask;
    statusOptions: IDropdownFieldOption[];
}

export class App extends React.Component<IAppProps, IAppState> {

    private _componentProps = [];
    private _components = [];

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
        this._buildComponentProps = this._buildComponentProps.bind(this);
    }

    public componentWillMount() {
        this._buildComponentProps();
    }

    private _onTitleChanged(ev: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            task: assoc('title', ev.currentTarget.value, this.state.task)
        });
    }

    private _onDescriptionChanged(ev: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            task: assoc('description', ev.currentTarget.value, this.state.task)
        });
    }

    private _onStatusChanged(ev: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            task: assoc('status', ev.currentTarget.value, this.state.task)
        });
    }

    private _buildComponentProps() {
        this._components = [
            compose(
                TextField('Title', this._onTitleChanged),
                prop('title')
            ),
            compose(
                MultilineTextField('Description', this._onDescriptionChanged),
                prop('description')
            ),
            compose(
                DropdownField('Status', this.state.statusOptions, this._onStatusChanged),
                prop('status')
            )
        ];
    }

    public render() {

        return (
            <div className='container'>
                <div className='header'>Task Form (composed)</div>
                {juxt(this._components)(this.state.task)}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app-host'));