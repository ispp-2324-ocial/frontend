

<template>
  <RTooltipProvider :delay-duration="100">
    <RTooltipRoot>
      <RTooltipTrigger>
        <slot />
      </RTooltipTrigger>
      <RTooltipContent
        class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-grass11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
        :side-offset="5">
        <slot name="tooltip" />
        <RTooltipArrow
          class="fill-white"
          :width="8" />
      </RTooltipContent>
    </RTooltipRoot>
  </RTooltipProvider>
</template>
