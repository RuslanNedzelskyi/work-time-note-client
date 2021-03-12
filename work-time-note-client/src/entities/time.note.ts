import { EntityBase } from "./entity.base";

export class TimeNote extends EntityBase {
    public name: string = '';

    public start: Date = new Date();

    public end: Date = new Date();

    public rate: number = 0;

    public value: number = 0;
}