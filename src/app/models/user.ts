export class User {
    public _id: string;
    public roles: any;
    public active: boolean;
    constructor(public name: string, public clas: string, public login: string, public password: string) { }
}