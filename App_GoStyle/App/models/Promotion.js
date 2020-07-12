export class Promotion{

    constructor(id, code, description, start, end, percentage, image) {
        this._id = id;
        this._code = code;
        this._description = description;
        this._start = start;
        this._end = end;
        this._percentage = percentage;
        this._image = image;
        }

    get id() {
        return this._id;
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

    get code() {
        return this._code;
    }
}
