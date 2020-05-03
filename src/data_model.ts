
export interface IActivity {
    id: number;
    name: string;
    duration_sec: number;
}

export class ActivityModel {
    warmup?: Array< IActivity >;
    workout: Array< IActivity >;
    cooldown?: Array< IActivity >;

    constructor() {
        this.workout = [
            { id: 0, name: 'Zero activity', duration_sec: 30 },
            { id: 1, name: 'One activity', duration_sec: 30 },
            { id: 2, name: 'Two activity', duration_sec: 30 },
          ];
    }

    public hasWarmup(): boolean {
        return (this.warmup === null);
    }

    public hasCooldown(): boolean {
        return (this.cooldown === null);
    }
}

export const activityModel = new ActivityModel();
