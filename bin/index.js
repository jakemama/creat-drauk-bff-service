#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
// 引入模板文件
const templates = require('../templates/index');
// 处理文件
const fs = require("fs");

// 命令行选择列表
let prompList = [
    {
        type:'list',
        name: 'template',
        message: '请选择你想要生成的模板？',
        choices: templates,
        default: templates[0]
    }
]
// 创建文件夹命令行
program
    .command('mkdir <folder>')
    .description('创建一个文件夹')
    .action((folder) => {
        if(fs.existsSync(folder)) {
            console.log('文件夹已存在')
        } else {
            fs.mkdirSync(folder);
            console.log('文件夹创建成功')
        }
    });
// 创建文件命令行
program
    .command('touch <filename>')
    .description('创建一个文件')
    .action(async (filename) => {
        const res = await inquirer.prompt(prompList)
        if(res.template === 'reactClass') {
          templates.forEach((item) => {
              console.log(item);
              if(item.name === 'reactClass') {
                  fs.writeFile(`./${filename}.jsx`, item.src(filename), function(err) {
                      if(err) {
                          console.log('创建失败：', err)
                      } else {
                          console.log(`创建文件成功！${filename}.jsx`);
                      }
                  })
              }
          })
      }
      if(res.template === 'vueTemplate') {
          templates.forEach((item) => {
            console.log(item);
              if(item.name === 'vueTemplate') {
                  fs.writeFile(`./${filename}.vue`, item.src(filename), function(err) {
                      if(err) {
                          console.log('创建失败：', err)
                      } else {
                          console.log(`文件创建成功！${filename}`);
                      }
                  })
              }
          })
      } 
    })

// 字符串分割为数组的方法
function strToArr(value, preValue){
    return value.split(',')
}
// cli版本
program.version(require('../package.json').version, '-v, --version', 'cli的最新版本');
// 设置选项
program
    .option('-d, --debug', '调试一下')
    .option('-l, --list <value>', '把字符串分割为数组', strToArr)
    .action((options, command) => {
      if(options) {
        console.log(options)
      }
      // 进行逻辑处理
      if(options.debug) {
          console.log("调试成功")
      }
      if(options.list !== undefined) {
          console.log(options.list)
      }
  });

// 处理命令行输入的参数
program.parse(process.argv);