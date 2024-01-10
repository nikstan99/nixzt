<template>
   <Teleport to="body">
     <Transition name="fade">
       <div
         v-show="toggleState"
         @click.stop="onBackdropClick"
         :class="['z-30 flex justify-center fixed', modalPosition, backdrop, backdropColor]"
       >
         <div
           ref="modal"
           :class="['relative max-w-full max-h-full', modalClassNames]"
           :style="{ width, height } as StyleValue"
         >
           <Button
             v-if="closeButton"
             ref="modalClose"
             icon="plus"
             :button-style="ButtonStyle.NONE"
             class="absolute top-5 right-5 rotate-45"
             @click.stop="(event: Event) => close(event, true)"
           />
           <slot></slot>
         </div>
       </div>
     </Transition>
   </Teleport>
 </template>
 
 <script lang="ts">
 export enum ModalPosition {
   TOP = "items-start top-0",
   BOTTOM = "items-end bottom-0",
   CENTER = "items-center",
 }
 
 export enum Backdrop {
   NONE = "",
   X_FULL = "inset-x-0",
   Y_FULL = "inset-y-0",
   FULL = `inset-x-0 inset-y-0`,
 }
 
 export enum BackdropColor {
   NONE = "",
   DARK_BLURRED = `bg-black/50 backdrop-blur`,
 }
 </script>
 
 <script setup lang="ts">
 import { ButtonStyle } from "./Button.vue";
 import type { StyleValue } from "vue";
 
 interface Props {
   backdrop?: Backdrop;
   backdropColor?: BackdropColor;
   backdropClose?: Boolean;
   closeButton?: Boolean;
   stopScroll?: Boolean;
   modalPosition?: ModalPosition;
   width?: String | Number;
   height?: String | Number;
   modalClassNames?: String;
 }
 const props = withDefaults(defineProps<Props>(), {
   backdrop: Backdrop.FULL,
   backdropColor: BackdropColor.DARK_BLURRED,
   backdropClose: () => true,
   stopScroll: () => false,
   width: () => "400px",
   modalPosition: ModalPosition.CENTER,
   modalClassNames: () => "mx-10 p-10 bg-white rounded-xl",
 });
 
 const width = computed(() =>
   typeof props.width === "number" ? `${props.width}px` : props.width
 );
 
 const height = computed(() =>
   typeof props.height === "number" ? `${props.height}px` : props.height
 );
 
 const modal = ref<HTMLDivElement>();
 const toggleState = ref<Boolean>(false);
 
 const toggleScroll = (scroll: Boolean) => {
   useHead({
     bodyAttrs: {
       class: scroll ? "overflow-y-hidden" : "",
     },
   });
 };
 
 const open = () => {
   toggleScroll(props.stopScroll);
   toggleState.value = true;
 };
 const close = (event: Event, force: Boolean = false) => {
   const isInside =
     event.target === modal.value ||
     event.composedPath().includes(modal.value as EventTarget);
 
   if (isInside && !force) {
     return;
   }
 
   toggleScroll(false);
   toggleState.value = false;
 };
 
 const onBackdropClick = (event: Event) => {
   if (!props.backdropClose) {
     return;
   }
 
   close(event);
 };
 
 // Expose methdos for other components. For example the parent can toggle the dropdown
 defineExpose({
   open,
   close,
 });
 </script>
 