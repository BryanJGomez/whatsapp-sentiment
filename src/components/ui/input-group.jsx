import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function InputGroup({ className, children, ...props }) {
  return (
    <div
      data-slot="input-group"
      className={cn('flex w-full items-center', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function InputGroupAddon({ className, ...props }) {
  return (
    <div
      data-slot="input-group-addon"
      className={cn(
        'flex h-9 items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors',
        className
      )}
      {...props}
    />
  )
}

export { InputGroup, InputGroupAddon }
