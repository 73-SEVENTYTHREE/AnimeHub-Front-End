/**
 * 根据传入关键词和内容，返回带有<mark>标签的高亮html结构
 * @param keywords  关键词组
 * @param content   替换内容
 * @returns {{__html: string}}    更新后的内容
 * Author: Wei Liu
 * Date: 2021/07/14
 */
export default (keywords=[], content="") => {
    keywords.forEach(item => {
        content = content.replace(item, `<mark>${item}</mark>`)
    })
    return {__html: content};
}