export class ServerError extends Error {
    message;
    debug;
    code = 500;
    debugCode = 500;
    constructor(message, debug, debugCode = null) {
        super(message);
        this.message = message;
        this.debug = debug;
        if (debugCode) this.debugCode = debugCode;
    }
}

export class NotFound extends Error {
    message;
    debug;
    code = 404;
    debugCode = 404;
    constructor(message, debug, debugCode = null) {
        super(message);
        this.message = message;
        this.debug = debug;
        if (debugCode) this.debugCode = debugCode;
    }
}

export class BadRequest extends Error {
    message;
    debug;
    code = 400;
    debugCode = 400;
    constructor(message, debug, debugCode = null) {
        super(message);
        this.message = message;
        this.debug = debug;
        if (debugCode) this.debugCode = debugCode;
    }
}

export class FormError extends Error {
    errors;
    debug;
    code = 400;
    debugCode = 400;
    constructor(errors, debug, debugCode = null) {
        super();
        this.error = errors;
        this.debug = debug;
        if (debugCode) this.debugCode = debugCode;
    }
}
