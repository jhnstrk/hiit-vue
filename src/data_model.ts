
export interface IActivity {
    id: number;
    name: string;
    duration_sec: number;
}

export class ActivityModel {
    private warmup: Array< IActivity > | null = null;
    private workout: Array< IActivity >;
    private cooldown: Array< IActivity > | null = null;

    constructor() {
        this.workout = new Array<IActivity>();
    }

    public hasWarmup(): boolean {
        return (this.warmup === null);
    }

    public hasCooldown(): boolean {
        return (this.cooldown === null);
    }
}
