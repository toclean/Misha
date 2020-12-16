import NotImplementedError from "../Errors/NotImplementedError";

export default class Handler {
    handle(...args: any[]): void {
        throw new NotImplementedError(`Class '${this.constructor.name}' does not implement 'handle'`);
    }
}