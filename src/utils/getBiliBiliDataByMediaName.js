/**
 * 根据传入番剧名称获取BiliBili相关信息。
 * 参数：name:番剧名称。
 * 返回结果：js对象
 * 访问结果数据前应先判断result字段是否为undefined
 *  {
 *      ...
 *      result: Array（结果数组）
 *  }
 *
 *  获取得分示例：
 *  let searchResult = await getBiliBiliDataByMediaName('工作细胞');
 *  if(searchResult.result !== undefined){
 *      score = searchResult.result[0].media_score.score;
 *      user_count = searchResult.result[0].media_score.user_count;
 *  }
 *
 *  Author: Wei Liu
 *  Data: 2021/07/13
 */
import axios from "axios";
axios.defaults.timeout = 10000;
const setCookie = (name, value, days) => {
    const d = new Date ();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires=" + d.toUTCString ();
    document.cookie = name + "=" + value + "; " + expires;
}
export default async (name) => {
    axios.defaults.withCredentials=true;
    setCookie('SESSDATA', "xxx", 1000);
    return (await axios.get (`/x/web-interface/search/type`, {
        params: {
            search_type: 'media_bangumi',
            keyword: name
        }
    })).data.data;
}