export abstract class EntityBase {
    public id: number = 0;

    public netId: string = '00000000-0000-0000-0000-000000000000';

    public created: Date = new Date();

    public updated: Date = new Date();

    public deleted: boolean = false;
}
