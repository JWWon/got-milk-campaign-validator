export interface PageParam<ExtraSortByOption extends string = never> {
	/**
	 * @default 1
	 */
	page?: number
	/**
	 * @default 10
	 * @max 100
	 */
	page_limit?: number
	/**
	 * @default 'created_at'
	 */
	sort_by?: 'created_at' | 'updated_at' | ExtraSortByOption
	/**
	 * @default 'desc
	 */
	sort_option?: 'asc' | 'desc'
}

export interface PageResponse<Data, PageInfo extends object = {}> {
	data: Data[]
	page_info: {
		limit_per_page: number
		page: number
		total_page: number
		total_results: number
	} & PageInfo
}
