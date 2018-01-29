

export interface ITask {
    [key: string]: string | number;
    id: number;
    title: string;
    description: string;
    status: string;
}