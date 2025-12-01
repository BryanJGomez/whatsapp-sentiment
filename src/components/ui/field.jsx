import * as React from 'react'
import { cn } from '@/lib/utils'

function Field({ className, ...props }) {
  return (
    <div
      data-slot="field"
      className={cn('space-y-2', className)}
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }) {
  return (
    <label
      data-slot="field-label"
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }) {
  return (
    <p
      data-slot="field-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function FieldMessage({ className, ...props }) {
  return (
    <p
      data-slot="field-message"
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    />
  )
}

export { Field, FieldLabel, FieldDescription, FieldMessage }
