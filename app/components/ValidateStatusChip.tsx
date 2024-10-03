import type { Video } from '@/networks'
import { VALIDATE_STATUS_KEY, ValidateStatus } from '../constants/metadata'
import { Chip, ChipProps } from '@nextui-org/chip'
import React from 'react'

interface Props extends ChipProps {
	metadata: Video['metadata']
}

export default function ValidateStatusChip({ metadata, ...chipProps }: Props) {
	const status = metadata[VALIDATE_STATUS_KEY]
	return (
		<>
			{status === ValidateStatus.MATCHED && (
				<Chip {...chipProps} color="success">
					Matched
				</Chip>
			)}
			{status === ValidateStatus.NOT_MATCHED && (
				<Chip {...chipProps} color="danger">
					Not Matched
				</Chip>
			)}
			{!status && (
				<Chip {...chipProps} color="warning">
					Processing
				</Chip>
			)}
		</>
	)
}
