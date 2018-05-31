import { IActivateable } from "./Models/IActivateable";

export class ActivateableCollection implements Iterator<IActivateable>, IActivateable {

    public items: IActivateable[] = [];
    private pointer = 0;

    private isActivated: boolean = false;
    private isDisposing: boolean = false;

    constructor(...args: IActivateable[]) {
        this.items = args;
    }

    public next(): IteratorResult<IActivateable> {
        if (this.pointer < this.items.length) {
            return {
                done: false,
                value: this.items[this.pointer++],
            };
        } else {
            return {
                done: true,
                value: undefined as any,
            };
        }
    }
    public [Symbol.iterator](): IterableIterator<IActivateable> {
        return this;
    }

    public async dispose() {
        if (!this.isDisposing) {
            await Promise.all(this.items.map((item) => item.dispose()));
        }
    }

    public async activate() {
        if (this.isActivated) {
            throw Error("Already activated.");
        }

        if (this.isDisposing) {
            throw Error("Cannot activated, collection is disposed.");
        }
        await Promise.all(this.items.map((item) => item.activate()));
    }
}
