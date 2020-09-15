const currentDir = require('current-dir')
const fs = require('fs')
const _ = require('lodash')
const { features } = require('process')
const { src, mainStack, tsx, routes, ts } = require('./constants')
const { findDir, copyRecursiveSync } = require('./utils')

const dirLib = __dirname.replace('/bin', '/lib')

/**
 *
 * @param {} to thư mục tới cần copy
 * func này sẽ copy mẫu từ thư mục ../lib/view sang cho thư mục dích
 *
 */
function copyLib(to) {
  return new Promise((resolve) => {
    copyRecursiveSync(`${dirLib}/View`, to, (e) => {
      console.log('=====> copy success')
      if (!e) resolve(true)
    })
  })
}

/**
 *
 * @param {*} name tên của view mới
 * @param {*} view_dir thư mục gốc chứa view
 * @param {*} navigation_dir thư mục gốc navigation
 * tác dụng: sẽ tìm kiếm file src/navigation/MainStack.tsx
 * append phần import màn hình mới + stack mới vào
 */
function appendNavigation(name, view_dir, navigation_dir) {
  const dir = currentDir()
  const navigation = `${dir}/${src}/${navigation_dir}`
  // tìm kiếm thư mục navigation
  if (fs.existsSync(navigation)) {
    const stack = `${navigation}/${mainStack}.${tsx}`
    // tìm kiếm file MainStack
    if (fs.existsSync(stack)) {
      // nếu tồn tại mới bắt đầu đọc file và append dữ liệu
      fs.readFile(stack, 'utf8', (e, s) => {
        if (!e) {
          // điều kiện: phải chưa func createStack + chưa append view này
          if (s.includes('createStackNavigator') && !s.includes(`${name}`.toLowerCase())) {
            const indexImport = s.lastIndexOf('import')
            // tìm ra vị trí cuối cùng của import => để append đoạn import
            // import Name from 'src/features/name'
            if (indexImport > 0) {
              const b = `${s.slice(0, indexImport)}import ${_.capitalize(
                name
              )} from '${src}/${view_dir}/${name.toLowerCase()}'\n${s.slice(indexImport)}`
              // tìm ra vị trí để append phần Stack vào
              // <Stack.screen name={Routes.Name} component={Name}>
              const indexStack = b.lastIndexOf('</Stack.Navigator>')
              const newData = `${b.slice(0, indexStack)}  <Stack.Screen name={Routes.${_.capitalize(
                name
              )}} component={${_.capitalize(name)}} />\n    ${b.slice(indexStack)}`
              // sau tất cả sẽ tiến hành lưu thông tin lại vào file mainStack
              fs.writeFile(stack, newData, (e2) => {
                if (!e2) {
                  console.log('=====> append navigation success')
                }
              })
            }
          }
        }
      })
    }
  }
}

/**
 *
 * @param {*} name
 * @param {*} view_dir
 * @param {*} navigation_dir
 * func này sẽ tiến hành append routes cho navigation
 */
function appendRoutes(name, view_dir, navigation_dir) {
  const dir = currentDir()
  const navigation = `${dir}/${src}/${navigation_dir}`
  // tìm thư mục navigation
  if (fs.existsSync(navigation)) {
    const route = `${navigation}/${routes}.${ts}`
    // tìm file routes.ts
    if (fs.existsSync(route)) {
      fs.readFile(route, 'utf8', (e, s) => {
        if (!e) {
          // tìm vị trí } để add them
          // Name: 'Name'
          const index = s.lastIndexOf('}')
          if (index > 0 && !s.includes(`${_.capitalize(name)}: '${_.capitalize(name)}'`)) {
            const newData = `${s.slice(0, index)}  ${_.capitalize(name)}: '${_.capitalize(
              name
            )}',\n${s.slice(index)}`
            // xong thì lưu file
            fs.writeFile(route, newData, (e2) => {
              if (!e2) {
                console.log('=====> append routes success')
              }
            })
          }
        }
      })
    }
  }
}

/**
 *
 * @param {*} name
 * @param {*} root
 * @param {*} view_dir
 * @param {*} navigation_dir
 * func gốc
 */
function generateView(name, root, view_dir, navigation_dir) {
  let dir = currentDir()
  // tìm và tạo thư mục src
  findDir(dir, src).then(() => {
    dir += `/${src}`
    // tìm và tạo thư mcuj chưa view
    findDir(dir, view_dir || features).then(async () => {
      dir += `/${view_dir || features}`
      // tìm và tạo thư mục của Screen mới
      findDir(dir, `${name}`.toLowerCase()).then(() => {
        dir += `/${name}`.toLowerCase()
        copyLib(dir).then(() => {})
        appendNavigation(name, view_dir, navigation_dir)
        appendRoutes(name, view_dir, navigation_dir)
      })
    })
  })
}

module.exports = generateView
