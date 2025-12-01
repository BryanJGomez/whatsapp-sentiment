import * as React from 'react'
import { cn } from '@/lib/utils'

function ButtonGroup({ className, ...props }) {
  return (
    <div
      data-slot="button-group"
      className={cn('inline-flex rounded-md shadow-sm', className)}
      role="group"
      {...props}
    />
  )
}

export { ButtonGroup }
