import type { Video } from '@/networks'
import { VALIDATE_DESCRIPTION_KEY, VALIDATE_STATUS_KEY, ValidateStatus } from '../constants/metadata'
import { Chip, ChipProps } from '@nextui-org/chip'
import React from 'react'
import { Tooltip } from '@nextui-org/tooltip'

interface Props extends ChipProps {
	metadata: Video['metadata']
}

export default function ValidateStatusChip({ metadata, ...chipProps }: Props) {
	const status = metadata[VALIDATE_STATUS_KEY]
	return (
		<>
			{status ? (
				<Tooltip
					content={
						<div className="max-w-80 px-1 py-2">
							<p className="text-medium font-bold">Description</p>
							<p className="w-full whitespace-pre-wrap text-small">{metadata[VALIDATE_DESCRIPTION_KEY]}</p>
						</div>
					}
				>
					<Chip {...chipProps} color={status === ValidateStatus.MATCHED ? 'success' : 'danger'} className="capitalize">
						{status.toString().replace('_', ' ')}
					</Chip>
				</Tooltip>
			) : (
				<Chip {...chipProps} color="warning">
					Processing
				</Chip>
			)}
		</>
	)
}
