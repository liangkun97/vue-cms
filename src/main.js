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


// 导入 mui 的样式
import './lib/mui/css/mui.min.css'
// 导入图标样式
import './lib/mui/css/icons-extra.css'


import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)




import router from './router.js'

import app from './App.vue'




var vm = new Vue({
	el: "#app",
	data: {},
	methods: {},
	render: c => c(app),
	router
})
