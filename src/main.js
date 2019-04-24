import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)


// 导入 mui 的样式
import './lib/mui/css/mui.min.css'
// 导入图标样式
import './lib/mui/css/icons-extra.css'


import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)




import router from './router.js'

import app from './App.vue'




var vm = new Vue({
	el: "#app",
	data: {},
	methods: {},
	render: c => c(app),
	router
})
