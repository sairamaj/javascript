export class ProcessedRequest{
    constructor(public date: Date,
                public request: string,
                public response: string,
                public matches: string[]
    ){
    }
}