import {JSDOM} from 'jsdom'

export const render = async () => {
  const dom = await JSDOM.fromFile('index.html', {
    runScripts: 'dangerously',
    resources: 'usable',
  })

  await new Promise((resolve) => {
    dom.window.document.addEventListener('load', resolve)
  })

  return dom
}
