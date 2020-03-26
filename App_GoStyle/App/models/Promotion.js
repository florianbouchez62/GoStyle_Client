export class Promotion{

    constructor(name, description, start, end, percentage, image) {
        this._name = name;
        this._description = description;
        this._start = start;
        this._end = end;
        this._percentage = percentage;
        this._image = image;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get start() {
        return this._start;
    }

    get end() {
        return this._end;
    }

    get percentage() {
        return this._percentage;
    }

    get image() {
        return this._image;
    }
}
