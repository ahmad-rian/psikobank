"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

// Define the ProgressProps type
type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  value?: number
}

// Use React.forwardRef correctly with the types
const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  function Progress(props, ref) {
    const { className, value, ...others } = props

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...others}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-primary transition-all"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    )
  }
)

Progress.displayName = "Progress"

export { Progress, type ProgressProps }
