/**
 * Copyright (C) 2009-2015. David Thevenin, ViniSketch (c), and
 * contributors. All rights reserved
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


var BidirectionalChrono = vs.core.createClass ({

  parent: vs.core.Task,

  _duration: 300,
  _tick: 0,
  _invert: false,
  __pause_time: 0,
  __end_time: 0,
  
  properties: {
    duration: vs.core.Object.PROPERTY_IN,
    invert: {
      set: function (v) {

        if (v && !this._invert) {
          this._invert = true;
        }
        else if (!v && this._invert) {
          this._invert = false;
        }
        else return;

        if (this._state !== vs.core.Task.STARTED) return;

        var now = Date.now ();
        var d1 = now - this.__start_time;
        var d2 = this.__end_time - now;

        this.__start_time = now - d2;
        this.__end_time = now + d1;
      }
    },
    tick: vs.core.Object.PROPERTY_OUT
  },
  
  initComponent: function (event) {
    this._state = vs.core.Task.STOPPED;
    this._super ();
  },
  
  /**
   *  Starts the task
   *
   * @name vs.core.Task#start
   * @function
   *
   * @param {any} param any parameter (scalar, Array, Object)
   */
  start: function (param) {
    if (this._state === vs.core.Task.STARTED) return;

    if (this._state === vs.core.Task.STOPPED) {
      this.__pause_time = 0;
      this.__param = param;
    }
    
    this._start_clock ();
  },

  /**
   * @function
   * @private
   */
  _clock : function () {
    if (this._state !== vs.core.Task.STARTED) return;
    
    var now = Date.now ();

    if (this._invert) {
      // go to the past
      if (now >= this.__end_time) {
        this._tick = 0;
        this.propagateChange ('tick');
        if (this.__clb) this.__clb (this._tick);

        this._state = vs.core.Task.STOPPED;
        if (this.delegate && this.delegate.taskDidEnd) {
          this.delegate.taskDidEnd (this);
        }
      }
      else {
        // schedule a new tick
        vs.scheduleAction (this._clock.bind (this));
        this._tick = (this.__end_time - now) / this._duration;
        this.propagateChange ('tick');
        if (this.__clb) this.__clb (this._tick);
      }
    }

    else {
      if (now >= this.__end_time) {
        this._tick = 1;
        this.propagateChange ('tick');
        if (this.__clb) this.__clb (this._tick);

        this._state = vs.core.Task.STOPPED;
        if (this.delegate && this.delegate.taskDidEnd) {
          this.delegate.taskDidEnd (this);
        }
      }
      else {
        // schedule a new tick
        vs.scheduleAction (this._clock.bind (this));
        this._tick = (now - this.__start_time) / this._duration;
        this.propagateChange ('tick');
        if (this.__clb) this.__clb (this._tick);
      }
    }
  },

  /**
   * @function
   * @private
   */
  _start_clock: function () {
    if (this._state === vs.core.Task.PAUSED) {
      var pause_dur = Date.now () - this.__pause_time;
      this.__start_time += pause_dur;
      this.__end_time += pause_dur;
      this._state = vs.core.Task.STARTED;
      vs.scheduleAction (this._clock.bind (this));
      return;
    }
    
    this.__start_time = Date.now ();
    this.__end_time = this.__start_time + this._duration;
    
    if (vs.util.isFunction (this.__param)) this.__clb = this.__param;

    this._state = vs.core.Task.STARTED;
    this._tick = 0;
    this.propagateChange ('tick');
    if (this.__clb) this.__clb (this._tick);
    
    vs.scheduleAction (this._clock.bind (this));
  },

  /**
   *  Stops the task.<br />
   *  When the task is stopped, it calls the TaskDelegate.taskDidStop
   *  if it declared.
   *
   * @name vs.core.Task#stop
   * @function
   */
  stop: function () {
    this._state = vs.core.Task.STOPPED;
    this.__pause_time = 0;
    this._invert = false;
  },

  /**
   *  Pause the task.<br />
   *  When the task is paused, it calls the TaskDelegate.taskDidPause
   *  if it declared.
   *
   * @name vs.core.Task#pause
   * @function
   */
  pause: function () {
    if (!this._state === vs.core.Task.STARTED) return;
    this._state = vs.core.Task.PAUSED;
    this.__pause_time = Date.now ();
  }
});
