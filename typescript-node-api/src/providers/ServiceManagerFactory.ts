import { ServiceManager } from "../ServiceManager";
import { InMemoryProvider } from "./InMemoryProvider";
import { ServicesFileProvider } from "./ServicesFileProvicer";
import { MongoDbProvider } from "./MongoDbProvider";

export namespace ServiceManagerFactory {
    export function createServiceManager(): ServiceManager {
        // return new InMemoryProvider();
        //return new ServicesFileProvider();
        return new MongoDbProvider();
    }
}
