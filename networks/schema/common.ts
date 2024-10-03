export interface CommonSchema<T extends string = string> {
	_id: T
	created_at: string // Date format
	updated_at: string // Date format
}

export type IndexingStatus = 'ready' | 'indexing' | 'validating' | 'queued' | 'pending' | 'failed'
