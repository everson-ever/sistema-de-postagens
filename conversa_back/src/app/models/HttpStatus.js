class HttpStatus {
	constructor() {
		this.ok = 200;
		this.created = 201;
		this.badRequest = 400;
		this.unauthorized = 401;
		this.forbidden = 403;
		this.notFound = 404;
		this.internalServerError = 500;
	}
}

module.exports = new HttpStatus();
