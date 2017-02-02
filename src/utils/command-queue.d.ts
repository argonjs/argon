import { Event } from './event';
/**
* TODO.
*/
export declare class CommandQueue {
    private _queue;
    private _currentCommand;
    private _currentCommandPending;
    private _paused;
    /**
     * An error event.
     */
    errorEvent: Event<Error>;
    /**
     * If errorEvent has 1 listener, outputs the error message to the web console.
     */
    constructor();
    /**
     * Push a command to the command queue.
     * @param command Any command ready to be pushed into the command queue.
     */
    push<TResult>(command: () => Promise<TResult> | TResult, execute?: boolean): Promise<TResult>;
    /**
     * Execute the command queue
     */
    execute(): void;
    /**
     * Puase the command queue (currently executing commands will still complete)
     */
    pause(): void;
    /**
     * Clear commandQueue.
     */
    clear(): void;
    private _executeNextCommand();
}
