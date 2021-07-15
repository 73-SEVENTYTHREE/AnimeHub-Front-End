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
            search_type: 'bili_user',
            order:'fans',
            order_sort:'0',
            user_type:3,
            keyword: name
        }
    })).data.data;
}