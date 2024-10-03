import type { CommonSchema } from './common'

export * from './common'
export * from './video'

export enum IndexAddon {
	'thumbnail' = 'thumbnail'
}

export enum EngineName {
	MARENGO_2_6 = 'marengo2.6',
	MARENGO_2_5 = 'marengo2.5',
	MARENGO_2 = 'marengo2',
	PEGASUS_1 = 'pegasus1',
	PEGASUS_1_1 = 'pegasus1.1'
}

export enum EngineFamilyName {
	MARENGO = 'marengo',
	PEGASUS = 'pegasus'
}

export enum EngineOption {
	'visual' = 'visual',
	'conversation' = 'conversation',
	'text_in_video' = 'text_in_video',
	'logo' = 'logo'
}

type MarengoEngine = {
	engine_name: EngineName.MARENGO_2 | EngineName.MARENGO_2_5 | EngineName.MARENGO_2_6
	engine_options: EngineOption[]
}
type PegasusEngine = {
	engine_name: EngineName.PEGASUS_1 | EngineName.PEGASUS_1_1
	engine_options: (EngineOption.visual | EngineOption.conversation)[]
	finetuned?: boolean
}
export type Engine = MarengoEngine | PegasusEngine

export type IndexID = string & { __brand: 'index_id' }

export interface Index extends CommonSchema<IndexID> {
	index_name: string
	addons: IndexAddon[]
	engines: Engine[]
	video_count: number
	total_duration: number
	deleted?: boolean
	expires_at?: string | null
	// aggregated field from client side
	isExpired?: boolean
}
