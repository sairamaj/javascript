export class ProcessedRequest{
    constructor(public date: Date,
                public status: number,
                public request: string,
                public response: string,
                public matches: string[]
    ){
    }
}