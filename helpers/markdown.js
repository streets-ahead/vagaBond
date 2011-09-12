var md = require('node-markdown').Markdown;

exports.parse = function(md_text){
  return md(md_text)
}