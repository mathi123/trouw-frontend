import { User } from './user';

export class Therapy {
    public _id: string;
    public title: string;
    public description: string;
    public patient: User;
    public therapist: User;
    public therapistId: string;
    public patientId: string;
    public hasStarted = false;
}
