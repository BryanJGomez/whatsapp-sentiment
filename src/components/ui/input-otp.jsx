import * as React from 'react'
import { cn } from '@/lib/utils'

function InputOTP({ className, ...props }) {
  return (
    <div
      data-slot="input-otp"
      className={cn('flex gap-2', className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
}

function InputOTPSlot({ className, ...props }) {
  return (
    <div
      data-slot="input-otp-slot"
      className={cn(
        'relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
        className
      )}
      {...props}
    />
  )
}

function InputOTPSeparator({ ...props }) {
  return <div role="separator" {...props}>-</div>
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
