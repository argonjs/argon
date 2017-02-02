import {Event} from './event'

/**
* TODO.
*/
export class CommandQueue {
    private _queue: Array<{ command: Function, execute: Function, reject: (reason: any) => void }> = [];
    private _currentCommand: Function | undefined;
    private _currentCommandPending: Promise<any> | undefined;
    private _paused = true;

    /**
     * An error event.
     */
    public errorEvent = new Event<Error>();

    /**
     * If errorEvent has 1 listener, outputs the error message to the web console.
     */
    constructor() {
        this.errorEvent.addEventListener((error) => {
            if (this.errorEvent.numberOfListeners === 1) console.error(error);
        })
    }

    /**
     * Push a command to the command queue.
     * @param command Any command ready to be pushed into the command queue.
     */
    public push<TResult>(command: () => Promise<TResult>|TResult, execute?: boolean): Promise<TResult> {
        const result = new Promise<TResult>((resolve, reject) => {
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
        if (execute) this.execute();
        return result;
    }

    /**
     * Execute the command queue
     */
    public execute() {
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
    public pause() {
        this._paused = true;
    }

    /**
     * Clear commandQueue.
     */
    public clear() {
        this._queue.forEach((item) => {
            item.reject("Unable to execute.")
        })
        this._queue = [];
    }

    private _executeNextCommand() {
        this._currentCommand = undefined;
        this._currentCommandPending = undefined;
        if (this._paused) return;
        const item = this._queue.shift();
        if (!item) return;
        this._currentCommand = item.command;
        this._currentCommandPending = item.execute()
            .then(this._executeNextCommand.bind(this))
            .catch((e) => {
                this.errorEvent.raiseEvent(e);
                this._executeNextCommand();
            });
    }
}
