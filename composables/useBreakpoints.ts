import screens from "#tailwind-config/theme/screens";

export const useBreakpoints = () => {
  let screenSizes = screens;
  for (let breakpoint in screenSizes) {
    if (screenSizes.hasOwnProperty(breakpoint)) {
      screenSizes[breakpoint] = parseInt(screenSizes[breakpoint]);
    }
  }

  let props = {
    width: null || 0,
    type: null,
    screenSizes,
  };

  if (!process.client) {
    return props;
  }

  let windowWidth = ref(window.innerWidth);

  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  onMounted(() => window.addEventListener("resize", onWidthChange));
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  props.type = computed(() => {
    const breakpoints = Object.keys(screens);

    for (let i = 0; i < breakpoints.length; i++) {
      const currentBreakpoint = breakpoints[i];
      const nextBreakpoint = breakpoints[i + 1];

      const currentBreakpointNumber = parseInt(screens[currentBreakpoint]);
      const nextBreakpointNumber = parseInt(screens[nextBreakpoint]);

      if (windowWidth.value < currentBreakpointNumber) {
        return currentBreakpoint;
      } else if (
        windowWidth.value >= currentBreakpointNumber &&
        windowWidth.value < nextBreakpointNumber
      ) {
        return nextBreakpoint;
      }
    }
  });

  props.width = computed(() => windowWidth.value);

  return props;
};
