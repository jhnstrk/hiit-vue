
export enum ActivityType {
    Prep, Warmup, Workout, Cooldown,
};

export interface IActivity {
    id: number;
    name: string;
    durationSec: number;
    type: ActivityType;
}

export class ActivityModel {
    workout: Array< IActivity >;
    uid: number = 0;

    constructor() {
        this.workout = [
            { id: this.uid++, name: 'Get Ready', durationSec: 9,  type: ActivityType.Prep },
            { id: this.uid++, name: 'Press ups', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Rest', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Pull ups', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Rest', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Dips', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Rest', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Leg raises', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Rest', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Star jumps', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Rest', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'High knees running', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Rest', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Burpies', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Rest', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Squat thrusts', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Rest', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Weight raises', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Rest', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Lunges', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Rest', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Sit ups with weight', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Rest', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Sprint on the spot', durationSec: 30, type: ActivityType.Workout },
          ];
    }
 
    public newActivity() : void {
        this.workout.push(
            { id:  this.uid++, name: 'New activity', durationSec: 30, type: ActivityType.Workout  } 
        );
    }

    public removeActivity(id: number) {
        if (!this.workout) return;
        const ix = this.workout.findIndex( i => (i.id === id) );
        if (ix >= 0) {
          this.workout.splice(ix,1);
        }
    }
}
