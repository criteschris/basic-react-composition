# basic-react-composition
Basic example of using React and Ramda for composing components. This project consists of two versions of the same 'app', which is a basic task form. Many examples show how to compose components that are children of each other, but this shows how to compose components that are siblings of each other.

The example here is a task form where a user can enter the title, description, and status of a task. Although this is a simple form it should illustrate how multiple components can be composed together and scale up to a larger, more complex form (albeit a very basic linear structure).

The first component is a 'typical' React application consisting of a main component consuming functional components used to build up the form's UI. I do use Ramda for updating the state but this is the extent of its usage and the code should be familiar.

```js
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

    public render() {
        return (
            <div className='container'>
                <div className='header'>Task Form</div>
                <TextField
                    label='Title'
                    value={this.state.task.title}
                    onChanged={this._onTitleChanged} />
                <DropdownField
                    label='Status'
                    selectedKey={this.state.task.status}
                    options={this.state.statusOptions}
                    onChanged={this._onStatusChanged} />
                <MultilineTextField
                    label='Description'
                    value={this.state.task.description}
                    onChanged={this._onDescriptionChanged} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app-host'));
```

The second example uses Ramda's [`curry`](http://ramdajs.com/docs/#curry) and [`compose`](http://ramdajs.com/docs/#compose) functions to prepare the components for rendering. Upon rendering I use the [`juxt`](http://ramdajs.com/docs/#juxt) function to pass the state to each component, which through currying, is the last value needed to invoke the full composition of each component. The `juxt` function returns an array of results to which we use in the JSX of the render method.

```js
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
```