export class MapDetail {
    constructor(
        public name: string,
        public requestFileName : string,
        public request: string,
        public responseFileName: string,
        public response: string,
        public matches: string[]
    ){
    }
}