export const leftJson = {
    "ignore_me": 1,
    "ignore_me_remove": 1,
    "list_in_set": [
        {
            "id": 1,
            "label": "label:1",
            "set": [
                1,
                2,
                3
            ]
        },
        {
            "id": 2,
            "label": "label:2",
            "set": [
                4,
                5,
                6
            ]
        }
    ],
    "list": [
        {
            "id": 1,
            "label": "label:1"
        },
        {
            "id": 2,
            "label": "label:2"
        },
        {
            "id": 3,
            "label": "label:3"
        },
        {
            "id": 4,
            "label": "label:4"
        },
        {
            "id": 5,
            "label": "label:5"
        },
        {
            "id": 9,
            "label": "label:the:same"
        }
    ],
    "list:matchWithField": [
        {
            "customeId": 1,
            "label": "label:1"
        },
        {
            "customeId": 2,
            "label": "label:2"
        },
        {
            "customeId": 3,
            "label": "label:3"
        },
        {
            "customeId": 4,
            "label": "label:4"
        },
        {
            "customeId": 5,
            "label": "label:5"
        },
        {
            "customeId": 9,
            "label": "label:the:same"
        }
    ],
    "set_in_set": [
        {
            "id": 1,
            "label": "label:1",
            "set": [
                1,
                2,
                3
            ]
        },
        {
            "id": 2,
            "label": "label:2",
            "set": [
                4,
                5,
                6
            ]
        }
    ],
    "set": [
        {
            "id": 1,
            "label": "label:1"
        },
        {
            "id": 2,
            "label": "label:2"
        },
        {
            "id": 3,
            "label": "label:3"
        },
        {
            "id": 4,
            "label": "label:4"
        },
        {
            "id": 5,
            "label": "label:5"
        },
        {
            "id": 9,
            "label": "label:the:same"
        }
    ],
    "set:matchWithField": [
        {
            "customeId": 1,
            "label": "label:1"
        },
        {
            "customeId": 2,
            "label": "label:2"
        },
        {
            "customeId": 3,
            "label": "label:3"
        },
        {
            "customeId": 4,
            "label": "label:4"
        },
        {
            "customeId": 5,
            "label": "label:5"
        },
        {
            "customeId": 9,
            "label": "label:the:same"
        }
    ]
}
export const rightJson = {
    "ignore_me": 3,
    "ignore_me_add": 1,
    "list_in_set": [
        {
            "id": 1,
            "label": "label:1",
            "set": [
                1,
                5,
                3
            ]
        },
        {
            "id": 2,
            "label": "label:2",
            "set": [
                6,
                5,
                4
            ]
        }
    ],
    "list": [
        {
            "id": 9,
            "label": "label:9"
        },
        {
            "id": 1,
            "label": "label:111"
        },
        {
            "id": 3,
            "label": "label:3"
        },
        {
            "id": 8,
            "label": "label:8"
        },
        {
            "id": 5,
            "label": "label:5"
        },
        {
            "id": 7,
            "label": "label:7"
        },
        {
            "id": 999,
            "label": "label:the:same"
        }
    ],
    "list:matchWithField": [
        {
            "customeId": 9,
            "label": "label:9"
        },
        {
            "customeId": 1,
            "label": "label:111"
        },
        {
            "customeId": 3,
            "label": "label:333"
        },
        {
            "customeId": 5,
            "label": "label:5"
        },
        {
            "customeId": 7,
            "label": "label:7"
        },
        {
            "customeId": 999,
            "label": "label:the:same"
        }
    ],
    "set_in_set": [
        {
            "id": 2,
            "label": "label:2",
            "set": [
                6,
                5,
                4
            ]
        },
        {
            "id": 1,
            "label": "label:1",
            "set": [
                3,
                2,
                1
            ]
        }
    ],
    "set": [
        {
            "id": 5,
            "label": "label:5"
        },
        {
            "id": 4,
            "label": "label:4"
        },
        {
            "id": 2,
            "label": "label:2"
        },
        {
            "id": 1,
            "label": "label:111"
        },
        {
            "id": 6,
            "label": "label:6"
        },
        {
            "id": 999,
            "label": "label:the:same"
        }
    ],
    "set:matchWithField": [
        {
            "customeId": 5,
            "label": "label:5"
        },
        {
            "customeId": 4,
            "label": "label:4444"
        },
        {
            "customeId": 2,
            "label": "label:2222"
        },
        {
            "customeId": 1,
            "label": "label:1"
        },
        {
            "customeId": 6,
            "label": "label:6"
        },
        {
            "customeId": 999,
            "label": "label:the:same"
        }
    ]
};
export const diffResult = {
    "ignore": [{
        "left": 1,
        "left_path": "ignore_me",
        "pass": true,
        "path_regex": "ignore_me",
        "right": 3,
        "right_path": "ignore_me"
    }, {
        "left": "__NON_EXIST__",
        "left_path": "",
        "pass": true,
        "path_regex": "ignore_me",
        "right": 1,
        "right_path": "ignore_me_add"
    }, {
        "left": 1,
        "left_path": "ignore_me_remove",
        "pass": true,
        "path_regex": "ignore_me",
        "right": "__NON_EXIST__",
        "right_path": ""
    }],
    "just4vis:operator:list:matchWithField": [{
        "field": "customeId",
        "force": true,
        "left": {
            "customeId": 1,
            "label": "label:1"
        },
        "left_path": "list:matchWithField->[0]",
        "path_regex": "^.*:matchWithField->\\[\\d+\\]$",
        "right": {
            "customeId": 1,
            "label": "label:111"
        },
        "right_path": "list:matchWithField->[1]"
    }, {
        "field": "customeId",
        "force": true,
        "left": {
            "customeId": 3,
            "label": "label:3"
        },
        "left_path": "list:matchWithField->[2]",
        "path_regex": "^.*:matchWithField->\\[\\d+\\]$",
        "right": {
            "customeId": 3,
            "label": "label:333"
        },
        "right_path": "list:matchWithField->[2]"
    }, {
        "field": "customeId",
        "force": true,
        "left": {
            "customeId": 5,
            "label": "label:5"
        },
        "left_path": "list:matchWithField->[4]",
        "path_regex": "^.*:matchWithField->\\[\\d+\\]$",
        "right": {
            "customeId": 5,
            "label": "label:5"
        },
        "right_path": "list:matchWithField->[3]"
    }, {
        "field": "customeId",
        "force": true,
        "left": {
            "customeId": 1,
            "label": "label:1"
        },
        "left_path": "set:matchWithField->[0]",
        "path_regex": "^.*:matchWithField->\\[\\d+\\]$",
        "right": {
            "customeId": 1,
            "label": "label:1"
        },
        "right_path": "set:matchWithField->[3]"
    }, {
        "field": "customeId",
        "force": true,
        "left": {
            "customeId": 2,
            "label": "label:2"
        },
        "left_path": "set:matchWithField->[1]",
        "path_regex": "^.*:matchWithField->\\[\\d+\\]$",
        "right": {
            "customeId": 2,
            "label": "label:2222"
        },
        "right_path": "set:matchWithField->[2]"
    }, {
        "field": "customeId",
        "force": true,
        "left": {
            "customeId": 4,
            "label": "label:4"
        },
        "left_path": "set:matchWithField->[3]",
        "path_regex": "^.*:matchWithField->\\[\\d+\\]$",
        "right": {
            "customeId": 4,
            "label": "label:4444"
        },
        "right_path": "set:matchWithField->[1]"
    }, {
        "field": "customeId",
        "force": true,
        "left": {
            "customeId": 5,
            "label": "label:5"
        },
        "left_path": "set:matchWithField->[4]",
        "path_regex": "^.*:matchWithField->\\[\\d+\\]$",
        "right": {
            "customeId": 5,
            "label": "label:5"
        },
        "right_path": "set:matchWithField->[0]"
    }],
    "just4vis:pairs": [{
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": 1,
        "right_path": "ignore_me_add"
    }, {
        "left": 1,
        "left_path": "ignore_me_remove",
        "right": "__NON_EXIST__",
        "right_path": ""
    }, {
        "left": {
            "id": 1,
            "label": "label:1"
        },
        "left_path": "list->[0]",
        "right": {
            "id": 1,
            "label": "label:111"
        },
        "right_path": "list->[1]"
    }, {
        "left": 1,
        "left_path": "list->[0]->id",
        "right": 1,
        "right_path": "list->[1]->id"
    }, {
        "left": "label:1",
        "left_path": "list->[0]->label",
        "right": "label:111",
        "right_path": "list->[1]->label"
    }, {
        "left": {
            "id": 9,
            "label": "label:the:same"
        },
        "left_path": "list->[5]",
        "right": {
            "id": 999,
            "label": "label:the:same"
        },
        "right_path": "list->[6]"
    }, {
        "left": 9,
        "left_path": "list->[5]->id",
        "right": 999,
        "right_path": "list->[6]->id"
    }, {
        "left": "label:the:same",
        "left_path": "list->[5]->label",
        "right": "label:the:same",
        "right_path": "list->[6]->label"
    }, {
        "left": {
            "customeId": 1,
            "label": "label:1"
        },
        "left_path": "list:matchWithField->[0]",
        "right": {
            "customeId": 1,
            "label": "label:111"
        },
        "right_path": "list:matchWithField->[1]"
    }, {
        "left": 1,
        "left_path": "list:matchWithField->[0]->customeId",
        "right": 1,
        "right_path": "list:matchWithField->[1]->customeId"
    }, {
        "left": "label:1",
        "left_path": "list:matchWithField->[0]->label",
        "right": "label:111",
        "right_path": "list:matchWithField->[1]->label"
    }, {
        "left": {
            "customeId": 5,
            "label": "label:5"
        },
        "left_path": "list:matchWithField->[4]",
        "right": {
            "customeId": 5,
            "label": "label:5"
        },
        "right_path": "list:matchWithField->[3]"
    }, {
        "left": 5,
        "left_path": "list:matchWithField->[4]->customeId",
        "right": 5,
        "right_path": "list:matchWithField->[3]->customeId"
    }, {
        "left": "label:5",
        "left_path": "list:matchWithField->[4]->label",
        "right": "label:5",
        "right_path": "list:matchWithField->[3]->label"
    }, {
        "left": 6,
        "left_path": "list_in_set->[1]->set->[2]",
        "right": 6,
        "right_path": "list_in_set->[1]->set->[0]"
    }, {
        "left": {
            "id": 2,
            "label": "label:2"
        },
        "left_path": "set->[1]",
        "right": {
            "id": 2,
            "label": "label:2"
        },
        "right_path": "set->[2]"
    }, {
        "left": 2,
        "left_path": "set->[1]->id",
        "right": 2,
        "right_path": "set->[2]->id"
    }, {
        "left": "label:2",
        "left_path": "set->[1]->label",
        "right": "label:2",
        "right_path": "set->[2]->label"
    }, {
        "left": {
            "id": 4,
            "label": "label:4"
        },
        "left_path": "set->[3]",
        "right": {
            "id": 4,
            "label": "label:4"
        },
        "right_path": "set->[1]"
    }, {
        "left": 4,
        "left_path": "set->[3]->id",
        "right": 4,
        "right_path": "set->[1]->id"
    }, {
        "left": "label:4",
        "left_path": "set->[3]->label",
        "right": "label:4",
        "right_path": "set->[1]->label"
    }, {
        "left": {
            "id": 5,
            "label": "label:5"
        },
        "left_path": "set->[4]",
        "right": {
            "id": 5,
            "label": "label:5"
        },
        "right_path": "set->[0]"
    }, {
        "left": 5,
        "left_path": "set->[4]->id",
        "right": 5,
        "right_path": "set->[0]->id"
    }, {
        "left": "label:5",
        "left_path": "set->[4]->label",
        "right": "label:5",
        "right_path": "set->[0]->label"
    }, {
        "left": {
            "id": 1,
            "label": "label:1"
        },
        "left_path": "set->[0]",
        "right": {
            "id": 1,
            "label": "label:111"
        },
        "right_path": "set->[3]"
    }, {
        "left": 1,
        "left_path": "set->[0]->id",
        "right": 1,
        "right_path": "set->[3]->id"
    }, {
        "left": "label:1",
        "left_path": "set->[0]->label",
        "right": "label:111",
        "right_path": "set->[3]->label"
    }, {
        "left": {
            "customeId": 1,
            "label": "label:1"
        },
        "left_path": "set:matchWithField->[0]",
        "right": {
            "customeId": 1,
            "label": "label:1"
        },
        "right_path": "set:matchWithField->[3]"
    }, {
        "left": 1,
        "left_path": "set:matchWithField->[0]->customeId",
        "right": 1,
        "right_path": "set:matchWithField->[3]->customeId"
    }, {
        "left": "label:1",
        "left_path": "set:matchWithField->[0]->label",
        "right": "label:1",
        "right_path": "set:matchWithField->[3]->label"
    }, {
        "left": {
            "customeId": 2,
            "label": "label:2"
        },
        "left_path": "set:matchWithField->[1]",
        "right": {
            "customeId": 2,
            "label": "label:2222"
        },
        "right_path": "set:matchWithField->[2]"
    }, {
        "left": 2,
        "left_path": "set:matchWithField->[1]->customeId",
        "right": 2,
        "right_path": "set:matchWithField->[2]->customeId"
    }, {
        "left": "label:2",
        "left_path": "set:matchWithField->[1]->label",
        "right": "label:2222",
        "right_path": "set:matchWithField->[2]->label"
    }, {
        "left": {
            "customeId": 4,
            "label": "label:4"
        },
        "left_path": "set:matchWithField->[3]",
        "right": {
            "customeId": 4,
            "label": "label:4444"
        },
        "right_path": "set:matchWithField->[1]"
    }, {
        "left": 4,
        "left_path": "set:matchWithField->[3]->customeId",
        "right": 4,
        "right_path": "set:matchWithField->[1]->customeId"
    }, {
        "left": "label:4",
        "left_path": "set:matchWithField->[3]->label",
        "right": "label:4444",
        "right_path": "set:matchWithField->[1]->label"
    }, {
        "left": {
            "customeId": 5,
            "label": "label:5"
        },
        "left_path": "set:matchWithField->[4]",
        "right": {
            "customeId": 5,
            "label": "label:5"
        },
        "right_path": "set:matchWithField->[0]"
    }, {
        "left": 5,
        "left_path": "set:matchWithField->[4]->customeId",
        "right": 5,
        "right_path": "set:matchWithField->[0]->customeId"
    }, {
        "left": "label:5",
        "left_path": "set:matchWithField->[4]->label",
        "right": "label:5",
        "right_path": "set:matchWithField->[0]->label"
    }, {
        "left": {
            "id": 1,
            "label": "label:1",
            "set": [1, 2, 3]
        },
        "left_path": "set_in_set->[0]",
        "right": {
            "id": 1,
            "label": "label:1",
            "set": [3, 2, 1]
        },
        "right_path": "set_in_set->[1]"
    }, {
        "left": 1,
        "left_path": "set_in_set->[0]->id",
        "right": 1,
        "right_path": "set_in_set->[1]->id"
    }, {
        "left": "label:1",
        "left_path": "set_in_set->[0]->label",
        "right": "label:1",
        "right_path": "set_in_set->[1]->label"
    }, {
        "left": [1, 2, 3],
        "left_path": "set_in_set->[0]->set",
        "right": [3, 2, 1],
        "right_path": "set_in_set->[1]->set"
    }, {
        "left": 1,
        "left_path": "set_in_set->[0]->set->[0]",
        "right": 1,
        "right_path": "set_in_set->[1]->set->[2]"
    }, {
        "left": 2,
        "left_path": "set_in_set->[0]->set->[1]",
        "right": 2,
        "right_path": "set_in_set->[1]->set->[1]"
    }, {
        "left": 3,
        "left_path": "set_in_set->[0]->set->[2]",
        "right": 3,
        "right_path": "set_in_set->[1]->set->[0]"
    }, {
        "left": {
            "id": 2,
            "label": "label:2",
            "set": [4, 5, 6]
        },
        "left_path": "set_in_set->[1]",
        "right": {
            "id": 2,
            "label": "label:2",
            "set": [6, 5, 4]
        },
        "right_path": "set_in_set->[0]"
    }, {
        "left": 2,
        "left_path": "set_in_set->[1]->id",
        "right": 2,
        "right_path": "set_in_set->[0]->id"
    }, {
        "left": "label:2",
        "left_path": "set_in_set->[1]->label",
        "right": "label:2",
        "right_path": "set_in_set->[0]->label"
    }, {
        "left": [4, 5, 6],
        "left_path": "set_in_set->[1]->set",
        "right": [6, 5, 4],
        "right_path": "set_in_set->[0]->set"
    }, {
        "left": 4,
        "left_path": "set_in_set->[1]->set->[0]",
        "right": 4,
        "right_path": "set_in_set->[0]->set->[2]"
    }, {
        "left": 5,
        "left_path": "set_in_set->[1]->set->[1]",
        "right": 5,
        "right_path": "set_in_set->[0]->set->[1]"
    }, {
        "left": 6,
        "left_path": "set_in_set->[1]->set->[2]",
        "right": 6,
        "right_path": "set_in_set->[0]->set->[0]"
    }],
    "list:add": [{
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": {
            "id": 9,
            "label": "label:9"
        },
        "right_path": "list->[0]"
    }, {
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": {
            "id": 8,
            "label": "label:8"
        },
        "right_path": "list->[3]"
    }, {
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": {
            "id": 7,
            "label": "label:7"
        },
        "right_path": "list->[5]"
    }, {
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": {
            "customeId": 9,
            "label": "label:9"
        },
        "right_path": "list:matchWithField->[0]"
    }, {
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": {
            "customeId": 7,
            "label": "label:7"
        },
        "right_path": "list:matchWithField->[4]"
    }, {
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": {
            "customeId": 999,
            "label": "label:the:same"
        },
        "right_path": "list:matchWithField->[5]"
    }, {
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": 5,
        "right_path": "list_in_set->[0]->set->[1]"
    }, {
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": 5,
        "right_path": "list_in_set->[1]->set->[1]"
    }, {
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": 4,
        "right_path": "list_in_set->[1]->set->[2]"
    }, {
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": {
            "id": 6,
            "label": "label:6"
        },
        "right_path": "set->[4]"
    }, {
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": {
            "customeId": 6,
            "label": "label:6"
        },
        "right_path": "set:matchWithField->[4]"
    }, {
        "left": "__NON_EXIST__",
        "left_path": "",
        "right": {
            "customeId": 999,
            "label": "label:the:same"
        },
        "right_path": "set:matchWithField->[5]"
    }],
    "list:remove": [{
        "left": {
            "id": 2,
            "label": "label:2"
        },
        "left_path": "list->[1]",
        "right": "__NON_EXIST__",
        "right_path": ""
    }, {
        "left": {
            "id": 4,
            "label": "label:4"
        },
        "left_path": "list->[3]",
        "right": "__NON_EXIST__",
        "right_path": ""
    }, {
        "left": {
            "customeId": 2,
            "label": "label:2"
        },
        "left_path": "list:matchWithField->[1]",
        "right": "__NON_EXIST__",
        "right_path": ""
    }, {
        "left": {
            "customeId": 4,
            "label": "label:4"
        },
        "left_path": "list:matchWithField->[3]",
        "right": "__NON_EXIST__",
        "right_path": ""
    }, {
        "left": {
            "customeId": 9,
            "label": "label:the:same"
        },
        "left_path": "list:matchWithField->[5]",
        "right": "__NON_EXIST__",
        "right_path": ""
    }, {
        "left": 2,
        "left_path": "list_in_set->[0]->set->[1]",
        "right": "__NON_EXIST__",
        "right_path": ""
    }, {
        "left": 4,
        "left_path": "list_in_set->[1]->set->[0]",
        "right": "__NON_EXIST__",
        "right_path": ""
    }, {
        "left": 5,
        "left_path": "list_in_set->[1]->set->[1]",
        "right": "__NON_EXIST__",
        "right_path": ""
    }, {
        "left": {
            "id": 3,
            "label": "label:3"
        },
        "left_path": "set->[2]",
        "right": "__NON_EXIST__",
        "right_path": ""
    }, {
        "left": {
            "customeId": 3,
            "label": "label:3"
        },
        "left_path": "set:matchWithField->[2]",
        "right": "__NON_EXIST__",
        "right_path": ""
    }, {
        "left": {
            "customeId": 9,
            "label": "label:the:same"
        },
        "left_path": "set:matchWithField->[5]",
        "right": "__NON_EXIST__",
        "right_path": ""
    }],
    "value_changes": [{
        "left": "label:1",
        "left_path": "list->[0]->label",
        "new": "label:111",
        "old": "label:1",
        "right": "label:111",
        "right_path": "list->[1]->label"
    }, {
        "left": 9,
        "left_path": "list->[5]->id",
        "new": 999,
        "old": 9,
        "right": 999,
        "right_path": "list->[6]->id"
    }, {
        "left": "label:1",
        "left_path": "list:matchWithField->[0]->label",
        "new": "label:111",
        "old": "label:1",
        "right": "label:111",
        "right_path": "list:matchWithField->[1]->label"
    }, {
        "left": "label:3",
        "left_path": "list:matchWithField->[2]->label",
        "new": "label:333",
        "old": "label:3",
        "right": "label:333",
        "right_path": "list:matchWithField->[2]->label"
    }, {
        "left": "label:1",
        "left_path": "set->[0]->label",
        "new": "label:111",
        "old": "label:1",
        "right": "label:111",
        "right_path": "set->[3]->label"
    }, {
        "left": 9,
        "left_path": "set->[5]->id",
        "new": 999,
        "old": 9,
        "right": 999,
        "right_path": "set->[5]->id"
    }, {
        "left": "label:2",
        "left_path": "set:matchWithField->[1]->label",
        "new": "label:2222",
        "old": "label:2",
        "right": "label:2222",
        "right_path": "set:matchWithField->[2]->label"
    }, {
        "left": "label:4",
        "left_path": "set:matchWithField->[3]->label",
        "new": "label:4444",
        "old": "label:4",
        "right": "label:4444",
        "right_path": "set:matchWithField->[1]->label"
    }]
}