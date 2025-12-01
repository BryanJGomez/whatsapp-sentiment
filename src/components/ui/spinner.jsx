import * as React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

function Spinner({ className, size = 'default', ...props }) {
  const sizeClasses = {
    sm: 'size-4',
    default: 'size-6',
    lg: 'size-8',
  }

  return (
    <Loader2
      data-slot="spinner"
      className={cn('animate-spin', sizeClasses[size], className)}
      {...props}
    />
  )
}

export { Spinner }
