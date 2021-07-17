let book={
    "guid":"全局id",
    "type":"条目类型(可为空)",
    "primary_name":"书籍原名",
    "zh_name":"中文名（若没有可与primary_name相同）",
    "description":"条目内容描述",
    "book_type":"书籍类型",
    "writer":[
    "作者1",
    "作者2",
    ],
    "illust":[
        "作画1",
        "作画2",
    ],
    "press":[
        "出版社1",
    ],
    "names":[
        "别名1",
        "别名2"
    ],
    "tags":[
        "标签1",
        "标签2"
    ],
    "visuals":[
        "https://lain.bgm.tv/pic/cover/l/15/c9/135218_YYbSq.jpg",
        "图片url2"
    ],
    "related_subjects":[
        "关联条目1",
        "关联条目2"
    ],
    "chara_list":[//可能为空
        {
            "guid": "全局唯一id",
            "primary_name":"原名",
            "zh_name":"中文名（若没有可与primary_name相同）",
            "role":"角色定位",
            "visuals": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        },
        {
            "guid": "全局唯一id",
            "primary_name":"原名",
            "zh_name":"中文名（若没有可与primary_name相同）",
            "role":"角色定位",
            "visuals": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        },
    ],
    "extra_data":"以防有未定义过的类型（可为空）",
}
export default book;