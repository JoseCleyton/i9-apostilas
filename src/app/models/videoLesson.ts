export class VideoLesson {
    public _id: string;
    public date: string
    constructor(public title: string, public link: string, public clas: string, public description: string) { }
}