import { Step } from './step';

export class Task {
    public _id: string;
    public exerciseId: string;
    public order: number;
    public title: string;
    public steps: Step[];
}
