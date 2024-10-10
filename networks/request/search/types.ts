import type { Engine, EngineOption, IndexID } from '../../schema'

export enum Confidence {
	HIGH = 'high',
	MEDIUM = 'medium',
	LOW = 'low',
	NONE = 'none'
}

export enum GroupBy {
	'clip' = 'clip',
	'video' = 'video'
}

export enum ConversationOption {
	SEMANTIC = 'semantic',
	EXACT_MATCH = 'exact_match'
}

interface SearchParamsBase {
	index_id: IndexID
	filter?: {
		/**
		 * An array of strings that restricts your search results based on the specified video IDs.
		 */
		id?: string[]
		/**
		 * A numeric field that restricts your search results based on duration. Expressed in seconds.
		 */
		duration?: number
		/**
		 * A numeric field that restricts your search results based on width.
		 */
		width?: number
		/**
		 * A numeric field that restricts your search results based on height.
		 */
		height?: number
		/**
		 * A numeric field that restricts your search results based on size. Expressed in bytes.
		 */
		size?: number
	}
	/**
	 * @default 'clip'
	 */
	group_by?: GroupBy
	/**
	 * @default 10
	 */
	page_limit?: number
	/**
	 * @default low
	 */
	threshold?: Confidence
	/**
	 * @default 'score'
	 */
	sort_option?: 'score' | 'hits'
	/**
	 * @default 0.5
	 */
	adjust_confidence_level?: number
	/**
	 * Array that specifies the sources of information the platform uses when performing a search
	 */
	search_options: EngineOption[]
	/**
	 * @default 'or'
	 */
	operator?: 'or' | 'and'
	/**
	 * @default 'semantic'
	 */
	conversation_option?: ConversationOption
}

export interface SearchParams extends SearchParamsBase {
	query: string
}

export type SearchV2Params = SearchParamsBase &
	(
		| {
				/**
				 * Text query for search
				 */
				query_text: string
				query_media_type?: never
				query_media_url?: never
				query_media_file?: never
		  }
		| {
				query_text?: never
				/**
				 * Type of media search, 'image' is the only option at the moment
				 */
				query_media_type: 'image'
				/**
				 * Publicly accessible URL for image search
				 */
				query_media_url: string
				query_media_file?: never
		  }
		| {
				query_text?: never
				/**
				 * Type of media search, 'image' is the only option at the moment
				 */
				query_media_type: 'image'
				query_media_url?: never
				/**
				 * Object url for image blob which will be sent to the server for image query
				 */
				query_media_file: string
		  }
	)

export interface SearchResponse {
	score: number
	start: number
	end: number
	metadata?: {
		type: Engine
		text?: string
		range?: { Gte: number; Lte: number }
		raw_score?: number
	}[]
	video_id: string
	confidence: Confidence
	/**
	 * This field will be returned when `thumbnail` search option is set
	 */
	thumbnail_url?: string
	/**
	 * These fields will be returned when `debug` query is set as `true`
	 */
	modules?: { confidence: Confidence; type: EngineOption }[]
}

export type PageToken = string & { __brand: 'page_token' }

export interface SearchResponseGroupByClip {
	data: SearchResponse[]
	page_info: {
		limit_per_page: number
		total_results: number
		page_expired_at: string
		next_page_token?: PageToken
	}
	search_pool: {
		index_id: string
		total_count: number
		total_duration: number
	}
	query_media_url?: string
}

export interface SearchResponseGroupByVideo {
	data: SearchResponse[]
	page_info: {
		limit_per_page: number
		total_results: number
		page_expired_at: string
		total_inner_matches: number
		next_page_token?: PageToken
	}
	search_pool: {
		index_id: string
		total_count: number
		total_duration: number
	}
	query_media_url?: string
}
