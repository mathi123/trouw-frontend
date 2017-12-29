import { Exercise } from './exercise';

export class Assignment {
    public _id: string;
    public therapyId: string;
    public exerciseId: string;
    public executionId: string;
    public progress = 0;
    public exercise: Exercise;
    public order: number;
}
