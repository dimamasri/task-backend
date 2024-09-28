
export class MessageResponse {
    message;
    constructor(message) {
        this.message = message;
    }
}

export class DownloadResponse {
    path;
    constructor(path) {
        this.path = path;
    }
}

export class HtmlResponse {
    html;
    constructor(html) {
        this.html = html;
    }
}