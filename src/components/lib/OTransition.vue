<template>
  <component
    :is="getComponent()"
    class="o-transition"
    v-bind="mergeProps($props, $attrs)"
    :name="`o-transition-${props.name}`">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { Transition, TransitionGroup, type TransitionProps, type Component as VueComponent, mergeProps } from 'vue';
import ONoop from '@/components/lib/ONoop.vue';
import { prefersNoMotion } from '@/store';

export interface JTransitionProps extends BetterOmit<TransitionProps, 'name'> {
  name?: 'fade' | 'rotated-zoom' | 'slide-y-reverse' | 'slide-x' | 'slide-x-reverse';
  /**
   * Transition group props
   */
  tag?: string;
  moveClass?: string;
  /**
   * JTransition custom props
   */
  group?: boolean
}

const props = withDefaults(defineProps<JTransitionProps>(), { name: 'fade' });

/**
 * Get the component to use based on props and the current motion preference
 */
function getComponent(): VueComponent {
  if (prefersNoMotion.value) {
    return ONoop as VueComponent;
  } else if (props.group) {
    return TransitionGroup;
  } else {
    return Transition;
  }
}
</script>

<!-- TODO: Set scoped and remove .o-transition* prefix after: https://github.com/vuejs/core/issues/5148 -->

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style>
.o-transition {
  transition-duration: .15s !important;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
  transform-origin: center !important;
}

/** fade */
.o-transition-fade-enter-from,
.o-transition-fade-leave-to {
  opacity: 0 !important;
}

.o-transition-fade-enter-active,
.o-transition-fade-leave-active {
  transition-property: opacity !important;
}

/** rotated-zoom */
.o-transition-rotated-zoom-enter-from,
.o-transition-rotated-zoom-leave-to {
  transform: scale(0) rotate(-45deg);
}

.o-transition-rotated-zoom-enter-active,
.o-transition-rotated-zoom-leave-active {
  transition-property: transform !important;
}

/** slide-y-reverse */
.o-transition-slide-y-reverse-enter-from,
.o-transition-slide-y-reverse-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.o-transition-slide-y-reverse-enter-active,
.o-transition-slide-y-reverse-leave-active {
  transition-property: transform, opacity !important;
}

/** slide-x-reverse */
.o-transition-slide-x-reverse-enter-from,
.o-transition-slide-x-reverse-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

.o-transition-slide-x-reverse-enter-active,
.o-transition-slide-x-reverse-leave-active {
  transition-property: transform, opacity !important;
}
/** slide-x */
.o-transition-slide-x-enter-from,
.o-transition-slide-x-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}

.o-transition-slide-x-enter-active,
.o-transition-slide-x-leave-active {
  transition-property: transform, opacity !important;
}
</style>
