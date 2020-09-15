#!/usr/bin/env node

const currentDir = require('current-dir')
const fs = require('fs')
const { findDir, newFile, copyFile, findReducer } = require('./utils')
const { src, redux, ts, types, actions, reducer, sagas } = require('./constants')

const dirLib = __dirname.replace('/bin', '/lib')

/**
 *
 * @param {*} root
 * @param {*} name
 * func này sẽ tự động import reducer mới, và add thêm reducer vào phần combine
 */
function appendReducer(root, name) {
  if (findReducer(root)) {
    fs.readFile(`${root}/reducer.ts`, 'utf8', (e, a) => {
      if (!e) {
        if (a.includes('combineReducers({') && !a.includes(`${name.toLowerCase()}reducer`)) {
          const indexredux = a.lastIndexOf(`import`)
          // tìm ra vị trí import cuối cùng và add thêm phầm import vào
          if (indexredux > 0) {
            const b = `${a.slice(
              0,
              indexredux
            )}import ${name.toLowerCase()}reducer from './${name.toLowerCase()}reducer/reducer'\n${a.slice(
              indexredux
            )}`

            // tìm ra vị trí kết thuc để append phần reducer vào
            const index = b.lastIndexOf('})')
            if (index > 0) {
              const newData = `${b.slice(0, index - 1)}\n  ${name.toLowerCase()}reducer,\n${b.slice(
                index
              )}`

              fs.writeFile(`${root}/reducer.ts`, newData, () => {})
            }
          }
        }
      }
    })
  }
}

/**
 *
 * @param {} name
 * @param {*} root
 * tạo reducer bao gồm 4 file
 *   types.ts
 *   reducer.ts
 *   actions.ts
 *   sagas.ts
 */
function createReducer(name, root) {
  let dir = currentDir()
  findDir(dir, src).then(() => {
    dir += `/${src}`
    findDir(dir, root || redux).then(async () => {
      dir += `/${root || redux}`
      findDir(dir, `${name.replace('reducer', '')}reducer`.toLowerCase()).then(() => {
        dir += `/${name.replace('reducer', '')}reducer`.toLowerCase()
        Promise.all([
          copyFile(`${dirLib}/reducer/types.ts`, { root: dir, file: newFile(types, ts) }, name),
          copyFile(`${dirLib}/reducer/reducer.ts`, { root: dir, file: newFile(reducer, ts) }, name),
          copyFile(`${dirLib}/reducer/actions.ts`, { root: dir, file: newFile(actions, ts) }, name),
          copyFile(`${dirLib}/reducer/sagas.ts`, { root: dir, file: newFile(sagas, ts) }, name),
          appendReducer(`${currentDir()}/src/${root}`, name),
        ])
      })
    })
  })
}

module.exports = createReducer
