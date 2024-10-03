import { EngineFamilyName, EngineName, Index } from '../../schema'
import { PageParam, PageResponse } from '../_common'

export interface IndexListParam extends PageParam<'video_count'> {
	index_name?: string
	engine_id?: EngineName
	engine_family?: EngineFamilyName
	deleted?: boolean
	expired?: boolean
}

export type IndexResponse = Index

export type IndexListResponse = PageResponse<IndexResponse>
