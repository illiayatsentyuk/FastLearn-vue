import type { RouteLocationNormalized } from 'vue-router'

export async function loadLayoutMiddleware(route: RouteLocationNormalized) {
  try {
    const layout = route.meta.layout
    const layoutComponent = await import(`@/layouts/${layout}.vue`)
    route.meta.layoutComponent = layoutComponent.default
  } catch (e) {
    console.error('Error occurred in processing of layouts: ', e)
    console.log('Mounted default layout AppLayoutDefault')
    const layout = 'MyFirstLayout'
    const layoutComponent = await import(`@/layouts/${layout}.vue`)
    route.meta.layoutComponent = layoutComponent.default
  }
}
