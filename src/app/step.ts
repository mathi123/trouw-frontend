export class Step {
    public _id: string;
    public taskId: string;
    public type: string;
    public title: string;
    public description: string;
    public src: string;
    public metronome = false;
    public bpm = 65;
}
