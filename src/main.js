const axios = require('axios');

const translateRequest = function(obj) {
    let url = 'http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=en&q=中';
    console.log('url:', url);
	axios({
        method: 'GET',
        url: url,
        // data: {
        //     q: obj.word
        // },
        // responseType:'stream'
	}).then((res) => {
        console.log('res:', res.data);
	}).catch((err) => {
        console.log('err:', err);
    });
}

translateRequest({
    word: '中国'
});
