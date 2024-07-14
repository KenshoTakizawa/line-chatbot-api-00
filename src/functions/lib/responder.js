export class Responder {
    response(data, status) {
        return {
            statusCode: status,
            body: JSON.stringify({ data })
        };
    }

    doNotExistBodyElement(message, status) {
        return {
            statusCode: status,
            body: JSON.stringify({ message })
        };
    }
}
