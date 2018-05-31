import { expect } from "chai";
import { Server } from "tls";
import { ActivateableCollection, IActivateable } from "../src";

export const activateableCollectionTests = describe("ActivateableCollection", () => {

    const item1: IActivateable = { activate: async () => undefined, dispose: async () => undefined };
    const item2: IActivateable = { activate: async () => undefined, dispose: async () => undefined };
    const item3: IActivateable = { activate: async () => undefined, dispose: async () => undefined };

    it("Should be constructed without items", () => {
        const collection = new ActivateableCollection();
        expect(collection).to.be.instanceof(ActivateableCollection);
    });

    describe("Iterator", () => {
        it("Should be able to iterate through the items", () => {

            const collection = new ActivateableCollection(item1, item2, item3);
            expect(collection.next().value).to.be.eq(item1);
            expect(collection.next().value).to.be.eq(item2);
            expect(collection.next().value).to.be.eq(item3);
            expect(collection.next().value).to.be.eq(undefined);
        });

        it("Should be able to iterate with for-of", () => {
            const collection = new ActivateableCollection(item1, item2, item3);
            for (const item of collection) {
                expect(item).to.be.instanceof(Object);
            }
        });
    });

});
