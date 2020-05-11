
export enum ActivityType {
    Prep, Warmup, Workout, Rest, Cooldown,
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
    rest: IActivity;
    prep: IActivity;

    private STORAGE_KEY = "hiit-super-1.0";

    constructor() {
        this.rest = { id: this.uid++, name: 'Rest', durationSec: 30, type: ActivityType.Rest };
        this.prep = { id: this.uid++, name: 'Get Ready', durationSec: 9,  type: ActivityType.Prep };
        this.workout = [
            { id: this.uid++, name: 'Press ups', durationSec: 30, type: ActivityType.Workout },           
            { id: this.uid++, name: 'Pull ups', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Dips', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Leg raises', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Star jumps', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'High knees running', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Burpies', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Squat thrusts', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Weight raises', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Lunges', durationSec: 30, type: ActivityType.Workout },
            { id: this.uid++, name: 'Sit ups with weight', durationSec: 30, type: ActivityType.Workout },
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

    public nextActivity(prevAct: IActivity | null, currentAct?: IActivity | null): IActivity | null {
        if (!currentAct) {
            if (this.prep) {
                return this.prep;
            } else if (this.workout.length > 0) {
                return this.workout[0];
            } else {
                return null;
            }
        }
        if (currentAct.type === ActivityType.Prep) {
            if (this.workout.length > 0) {
                return this.workout[0];
            } else {
                return null;
            }
        } else if (currentAct.type === ActivityType.Workout) {
            const workoutIx = this.workout.findIndex(item => (item.id === currentAct.id));
            if ((workoutIx === this.workout.length - 1) || (workoutIx === -1)) {
                return null;
            }
            return this.rest;
        } else if (currentAct.type === ActivityType.Rest) {
            if (!prevAct) {
                return null;
            }
            const workoutIx = this.workout.findIndex(item => (item.id === prevAct.id));
            if ((workoutIx === this.workout.length - 1) || (workoutIx === -1)) {
                return null;
            }
            return this.workout[workoutIx + 1];   
         }

         console.log(`Bad activity`);
         return null;

    }

    public toJson(): string {
        const obj = {
            workout: this.workout,
            rest: this.rest,
            prep: this.prep,
        };
        return JSON.stringify(obj);
    }

    public fromJson(serialized: string): boolean {
        let obj;
        try {
            obj = JSON.parse(serialized)
        } catch(e) {
            console.log(`${e}`);
            return  false;
        }
        const workout = obj.workout as Array<IActivity>;
        if (!workout) {
            return false;
        }
        this.workout.splice(0, this.workout.length);
        workout.forEach((item) => this.workout.push(item));
        
        const rest = obj.rest as IActivity;
        if (rest) {
            this.rest = rest;
        }
        const prep = obj.prep as IActivity;
        if (prep) {
            this.prep = obj.prep;
        }

        this.uid = this.workout.reduce(
            (max,item) => item.id > max ? item.id : max,
            this.uid
            );

        this.uid = Math.max(this.uid, this.prep.id + 1, this.rest.id + 1);
        return true;
    }

    public save() {
        localStorage.setItem(this.STORAGE_KEY, this.toJson());
    }

    public restore(): boolean {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (!stored) {
            return false;
        }

        return this.fromJson(stored);;
    }
}
