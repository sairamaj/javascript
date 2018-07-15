import { ServiceManager } from "../ServiceManager";
import { InMemoryProvider } from "./InMemoryProvider";
import { FileProvider } from "./FileProvicer";

export namespace ServiceManagerFactory {
    export function createServiceManager(): ServiceManager {
        return new FileProvider();
    }
}
