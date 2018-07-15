import { HostConfigMap } from "./HostConfigMap";

export class Host{
    constructor(public name: string,
        public config : HostConfigMap[]
    ){
    }
}