//index.js文件内容
import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css'
if (module.hot) {
    // 实现热更新
    module.hot.accept();
}
ReactDOM.render(
    <h1>重拾react的第二天1231235</h1>,
    document.getElementById('root')
)