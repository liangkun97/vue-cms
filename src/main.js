import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入格式化时间的插件
import moment from 'moment'
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
	return moment(dataStr).format(pattern)
})

// 导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;




// 导入 mui 的样式
import './lib/mui/css/mui.min.css'
// 导入图标样式
import './lib/mui/css/icons-extra.css'


// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import router from './router.js'

import app from './App.vue'




var vm = new Vue({
	el: "#app",
	data: {},
	methods: {},
	render: c => c(app),
	router
})
