import { ActivityModel, IActivity } from "./data_model";
import { EDAudioPlay } from "./ed_audio_play";
import {TextToSpeech} from "./text-to-speech";


interface ICurrentState {
    startTime: number;
    lastUpdate:number;
    currentActivityIx: number;
    currentActivityStarted: number;
}

interface IViewState {
    remainingTime: number;   // Time left in current activity
    activeId: number;        // ID of current activity.
}

export class Controller {
    public model: ActivityModel;
    public viewModel: IViewState;
    public audio: EDAudioPlay;
    private state?: ICurrentState;
    private timerId?: NodeJS.Timer;

    constructor() {
        this.model = new ActivityModel();
        this.audio = new EDAudioPlay();
        this.viewModel = <IViewState> {
            remainingTime: 0,
            activeId: -1,
        };
    }

    public async initSound() {
        await this.audio.loadSoundAssets();
    }

    public async runActivities() {
        this.audio.resume();

        this.state = <ICurrentState> {
            startTime: this.audio.now(),
            lastUpdate: 0,
            currentActivityIx: -1,
            currentActivityStarted: -1,
        };

        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
        this.timerId = setInterval(() => {this.updateState()}, 500);

        this.updateState();
    }

    private updateState() {
        // console.log(JSON.stringify(this.state));

        const s = this.state;
        if (!s) {
            console.log('Bad state');
            return;
        }

        let current: IActivity | null = null;
        let nextUp: IActivity | null = null;
        let nextTime: number;

        if (s.currentActivityIx < 0) {
            s.currentActivityIx = -1;
            s.currentActivityStarted = s.startTime;
            nextTime = s.startTime;
            s.lastUpdate = s.startTime - 60;
        } else {
            current = this.model.workout[s.currentActivityIx];
            nextTime = s.currentActivityStarted + current.durationSec;
        }


        if (s.currentActivityIx < this.model.workout.length - 1) {
            nextUp = this.model.workout[s.currentActivityIx + 1];
        }

        const now = this.audio.now();

        const queueTimeSec = 5;
        if ( (nextTime - now < queueTimeSec) && 
            (s.lastUpdate <= nextTime - queueTimeSec) &&
            (now > nextTime - queueTimeSec)
            ) {

            if (nextUp) {
               TextToSpeech.say(nextUp.name);   
            }
            if (current && this.audio.pingSound && this.audio.dingSound) {
                this.audio.playBuffer(this.audio.pingSound, nextTime - 3);
                this.audio.playBuffer(this.audio.pingSound, nextTime - 2);
                this.audio.playBuffer(this.audio.pingSound, nextTime - 1);
                this.audio.playBuffer(this.audio.dingSound, nextTime);
            }
        } 

        if (nextTime <= now) {
            s.currentActivityIx++;
            if (current) {
                s.currentActivityStarted += current.durationSec;
            }
            if (s.currentActivityIx >= this.model.workout.length) {
                this.endWorkout();
            }
        }

        this.viewModel.remainingTime = nextTime - now;
        if (current) {
            this.viewModel.activeId = current.id;
        } else {
            this.viewModel.activeId = -1;
        }
        s.lastUpdate = now;
    }

    endWorkout() : void {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        } 
        TextToSpeech.say('Congratulations, your workout is complete!');
    }
}

export const theController = new Controller();
