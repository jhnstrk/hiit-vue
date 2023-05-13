import { ActivityModel, IActivity, ActivityType } from './data_model';
import { EDAudioPlay } from './ed_audio_play';
import { TextToSpeech } from './text-to-speech';
import * as Vue from 'vue';

interface ICurrentState {
  startTime: number;
  lastUpdate:number;
  currentActivity: IActivity | null;
  currentActivityStarted: number;
  nextActivity: IActivity | null;
  nextTime: number;
}

interface IViewState {
  remainingTime: number; // Time left in current activity
  activeId: number; // ID of current activity.
}

export class Controller {
  public model = Vue.reactive(new ActivityModel());

  public viewModel  = Vue.reactive(<IViewState> {
    remainingTime: 0,
    activeId: -1,
  });

  public audio = new EDAudioPlay();

  private state?: ICurrentState;

  private timerId?: NodeJS.Timer;

  // constructor() { }

  public async initSound() {
    await this.audio.loadSoundAssets();
  }

  public async runActivities() {
    if (this.timerId) {
      this.endWorkout();
      return;
    }
    this.audio.resume();

    this.state = <ICurrentState> {
      startTime: this.audio.now(),
      lastUpdate: 0,
      currentActivityStarted: -1,
    };

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
    this.timerId = setInterval(() => { this.updateState(); }, 500);

    this.updateState();
  }

  private updateState() {
    // console.log(JSON.stringify(this.state));

    const s = this.state;
    if (!s) {
      console.log('Bad state');
      return;
    }

    if (s.lastUpdate === 0) {
      s.nextActivity = this.model.nextActivity(null, null);
      s.currentActivityStarted = s.startTime;
      s.nextTime = s.startTime;
      s.lastUpdate = s.startTime - 60;
    }

    console.log(`${JSON.stringify(s.nextActivity)}`);
    const now = this.audio.now();

    const queueTimeSec = 5;
    if ((s.nextTime - now < queueTimeSec)
            && (s.lastUpdate <= s.nextTime - queueTimeSec)
            && (now > s.nextTime - queueTimeSec)
    ) {
      if (s.nextActivity) {
        TextToSpeech.say(s.nextActivity.name);
      }
      if (s.currentActivity && this.audio.pingSound && this.audio.dingSound) {
        this.audio.playBuffer(this.audio.pingSound, s.nextTime - 3);
        this.audio.playBuffer(this.audio.pingSound, s.nextTime - 2);
        this.audio.playBuffer(this.audio.pingSound, s.nextTime - 1);
        this.audio.playBuffer(this.audio.dingSound, s.nextTime);
      }
    }

    if (s.nextTime <= now) {
      // Advance to next.
      const prevAct = s.currentActivity;
      s.currentActivity = s.nextActivity;
      s.nextActivity = this.model.nextActivity(prevAct, s.currentActivity);

      s.currentActivityStarted = s.nextTime;
      if (s.currentActivity) {
        s.nextTime = s.currentActivityStarted + s.currentActivity.durationSec;
      }
      if (s.currentActivity === null) {
        this.endWorkout();
      }
    }

    this.viewModel.remainingTime = s.nextTime - now;
    if (s.currentActivity) {
      if (s.currentActivity.type !== ActivityType.Rest) {
        this.viewModel.activeId = s.currentActivity.id;
      }
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
