import { GenericResponse, GrpcWebError } from './protos/permissions';

export type HasGenericResponse = {
	Response: GenericResponse | undefined;
};

export class UipError extends Error {
	constructor(public id: string, public reason: string) {
		super(reason);
	}
}

export async function maybeUipError<T extends HasGenericResponse>(f: () => Promise<T>): Promise<T> {
	try {
		const result = await f();

		if (result.Response && !result.Response.Success)
			throw new UipError(result.Response.ErrorId, result.Response.Message);

		return result;
	} catch (e) {
		if (e instanceof GrpcWebError && e.metadata.has('X-Error-Id')) {
			const id = e.metadata.get('X-Error-Id')[0];
			const reason = e.metadata.get('X-Error-Reason')[0];
			throw new UipError(id, reason);
		}

		throw e;
	}
}
