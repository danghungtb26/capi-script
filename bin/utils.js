const fs = require('fs')
const _ = require('lodash')
const path = require('path')
require('colors')

/**
 *
 * @param {*} root
 * @param {*} dir
 * func này mục đichs tìm thư mục
 * nếu chưa có sẽ tự đônljg tạo
 */
function findDir(root, dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(root, (e, c) => {
      if (!e) {
        if (c.includes(dir)) {
          console.log(`folder ${dir} already exist`.blue)
          resolve(false)
        } else {
          fs.mkdir(`${root}/${dir}`, {}, (e2) => {
            if (e2) {
              reject(Error(`Error mkdir-${dir}`))
            } else {
              console.log(`create folder ${dir}`.blue)
              resolve(true)
            }
          })
        }
      } else {
        reject(Error(`Error readdir-root ${root}`))
      }
    })
  })
}

/**
 *
 * @param {} root
 * @param {*} file
 * @param {*} data
 * tương tự
 * nhưng func này sẽ tìm file và lưu data vào file
 */
function findFile(root, file, data = '') {
  return new Promise((resolve, reject) => {
    fs.readdir(root, (e, c) => {
      console.log('findFile -> c', c)
      if (!e) {
        let key = 'wx'
        if (c.includes(file)) {
          key = 'w'
          console.log(`Rewrite ${root}/${file}`.yellow)
        } else {
          console.log(`create and write ${root}/${file}`.yellow)
        }
        fs.writeFileSync(`${root}/${file}`, data, { flag: key }, (e2) => {
          if (e2) {
            reject(Error(`Error write ${file}`))
          } else {
            resolve(true)
          }
        })
      } else {
        reject(Error(`Error readdir-root ${root}`))
      }
    })
  })
}

/**
 *
 * @param {*} name
 * @param {*} extension
 * return filename
 */
function newFile(name, extension) {
  return `${name}.${extension}`
}

/**
 *
 * @param {*} from
 * @param {*} param1
 * @param {*} name
 * copy file, đồng thời replace 1 số trường đặc biệt
 */
function copyFile(from, { root, file }, name) {
  return new Promise((resolve) => {
    fs.readFile(from, 'utf8', (e, a) => {
      if (!e) {
        findFile(
          root,
          file,
          a
            .replace(/__name_up__/g, name.toUpperCase())
            .replace(/__name__/g, _.capitalize(name))
            .replace(/__name__low__/g, name.toLowerCase())
        ).then(() => {
          resolve(true)
        })
      }
    })
  })
}

/**
 *
 * @param {*} root
 * tìm thư mục reducers
 */
function findReducer(root) {
  return new Promise((resolve) => {
    fs.readdir(root, (e, r) => {
      if (!e && r.includes('reducer.ts')) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

/**
 * Look ma, it's cp -R.
 * @param {string} src The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest)
    fs.readdirSync(src).forEach((childItemName) => {
      console.log('copyRecursiveSync -> childItemName', childItemName)
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

module.exports = {
  findDir,
  findFile,
  newFile,
  copyFile,
  findReducer,
  copyRecursiveSync,
}
