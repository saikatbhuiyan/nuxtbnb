export default function(moduleOptions){
    console.log(moduleOptions.message)
    this.addPlugin('plugins/test.js')
}