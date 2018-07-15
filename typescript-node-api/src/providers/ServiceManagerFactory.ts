import { ServiceManager } from "../ServiceManager";
import { InMemoryProvider } from "./InMemoryProvider";
import { ServicesFileProvider } from "./ServicesFileProvicer";

export namespace ServiceManagerFactory {
    export function createServiceManager(): ServiceManager {
        return new ServicesFileProvider();
    }
}
