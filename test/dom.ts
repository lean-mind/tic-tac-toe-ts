import {JSDOM} from 'jsdom'

export const render = async () => {
  const dom = await JSDOM.fromFile('index.html', {
    runScripts: 'dangerously',
  })

  return dom.window.document
}
