import { IDisposable } from "@sensenet/client-utils";
import { Server } from "tls";
import { BypassLogger } from "./Loggers";
import { IApi } from "./Models/IApi";
import { IContext } from "./Models/IContext";
import { ILogger } from "./Models/ILogger";

export class StackBuilder {
    public logger: ILogger = new BypassLogger();
    public dispose(): void {
        this.logger.trace("Starting to dispose StackBuilder.");
        for (const api of this.apis) {
            api.dispose();
        }
        this.server.close();
        this.logger.trace("Disposing StackBuilder finished.");
    }
    protected apis: Array<IApi<IContext>> = [];
    public getApis = () => [...this.apis];
    public addApi(api: (builder: this) => IApi<IContext>): this {
        this.apis.push(api(this));
        return this;
    }

    public getServer = () => this.server;

    public async start() {
        await Promise.all([...this.apis.map((a) => a.activate())]);
    }

    constructor(protected readonly server: Server) { }
}
