export interface PaginatedResult<T> {
	totalDocuments: number;
	totalPages: number;
	currentPage: number;
	limit: number;
	nextPage: number | null;
	prevPage: number | null;
	data: T[];
}

export interface TimeStamps {
	createdAt: Date;
	updatedAt: Date;
}

export type role = "user" | "admin" | "client";
export type reqType = "body" | "query" | "params";
