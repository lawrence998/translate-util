const axios = require('axios');
const fs = require('fs');

const translateRequest = function(obj) {
    let url = 'http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=en&q=' + encodeURI(obj.word);
	return axios({
        method: 'GET',
        url: url
	}).then((res) => {
        return {
            cn: obj.word,
            en: res.data.sentences[0].trans
        };
	}).catch((err) => {
        console.log('err:', err);
    });
}

// let result = translateRequest({
//     word: '中国'
// });

fs.readFile('src/input.js', 'utf8', function(err, data){
    const reg = /[^\s]+/g;
    let wordArr = data.match(reg);
    let taskList = wordArr.map((item) => {
        return translateRequest({
            word: item
        });
    });
    Promise.all(taskList).then((arr) => {
        fs.writeFile('src/output.js', JSON.stringify(arr), function(err){
            if (!err) console.log('写入成功');
        });
    });
});