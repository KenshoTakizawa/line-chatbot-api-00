export class Responder {

    public normalResponse(message: string, status: number) {
        return {
            statusCode: status,
            body: JSON.stringify({ message: message })
        };
    }

    public doNotExistBodyElement(message: string, status: number) {
        return {
            statusCode: status,
            body: JSON.stringify({ message: message })
        };
    }

    errorResponse(message: string, status: number) {
        return {
            statusCode: status,
            body: JSON.stringify({ message: message })
        };
    }
}