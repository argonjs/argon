import { Event } from './event';
/**
* TODO.
*/
export class CommandQueue {
    /**
     * If errorEvent has 1 listener, outputs the error message to the web console.
     */
    constructor() {
        this._queue = [];
        this._paused = true;
        /**
         * An error event.
         */
        this.errorEvent = new Event();
        this.errorEvent.addEventListener((error) => {
            if (this.errorEvent.numberOfListeners === 1)
                console.error(error);
        });
    }
    /**
     * Push a command to the command queue.
     * @param command Any command ready to be pushed into the command queue.
     */
    push(command, execute) {
        const result = new Promise((resolve, reject) => {
            this._queue.push({
                command,
                reject,
                execute: () => {
                    // console.log('CommandQueue: Executing command ' + command.toString());
                    const result = Promise.resolve().then(command);
                    // result.then(() => { console.log('CommandQueue: DONE ' + command.toString()) });
                    resolve(result);
                    return result;
                }
            });
        });
        if (execute)
            this.execute();
        return result;
    }
    /**
     * Execute the command queue
     */
    execute() {
        this._paused = false;
        Promise.resolve().then(() => {
            if (this._queue.length > 0 && !this._currentCommandPending) {
                this._executeNextCommand();
            }
        });
    }
    /**
     * Puase the command queue (currently executing commands will still complete)
     */
    pause() {
        this._paused = true;
    }
    /**
     * Clear commandQueue.
     */
    clear() {
        this._queue.forEach((item) => {
            item.reject("Unable to execute.");
        });
        this._queue = [];
    }
    _executeNextCommand() {
        this._currentCommand = undefined;
        this._currentCommandPending = undefined;
        if (this._paused)
            return;
        const item = this._queue.shift();
        if (!item)
            return;
        this._currentCommand = item.command;
        this._currentCommandPending = item.execute()
            .then(this._executeNextCommand.bind(this))
            .catch((e) => {
            this.errorEvent.raiseEvent(e);
            this._executeNextCommand();
        });
    }
}
