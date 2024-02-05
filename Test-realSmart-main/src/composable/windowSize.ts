import type { Ref } from "vue";

export function useWindowSize() {
  let windowWidth = ref(window.innerWidth);

  // const onWidthChange = () => windowWidth.value = window.innerWidth
  // onMounted(() => window.addEventListener('resize', onWidthChange))
  // onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  // const type = computed(() => {
  //   if (windowWidth.value < 550) return 300
  //   if (windowWidth.value >= 550 && windowWidth.value < 1200) return 200
  //   if (windowWidth.value >= 1200) return 200
  //    return null; // This is an unreachable line, simply to keep eslint happy.
  // })

  // const width = computed(() => windowWidth.value)
  // h: window.innerHeight, w: window.innerWidth
  return { windowWidth };
}
