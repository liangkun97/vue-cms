import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem("car") || '[]')

var store = new Vuex.Store({
	// this.$store.state.***
	state: {
		// 将购物车中的商品数据用一个数据存储起来，在 car 数组中存储一些商品的对象。可以暂时将这个商品对象设计成这个样子
		//  { id: 商品的id, count: 要购买的数量，price: 商品的单价，selected: false }
		car: car
	},
	// this.$store.commit('方法的名称', '按需传递唯一的参数')
	mutations: {
		addToCar(state, goodsinfo) {
			// 点击加入购物车，把商品的信息，保存到 store 中的 car 上
			// 分析：
			// 1.如果购物车中，之前就已经有这个对应的商品楼，那么只需要更新数量
			// 2.如果没有，则直接把商品数据 push 到 car 中即可
			
			// 假设在购物车中，没有找到对应的商品
			var flag = false

			state.car.some(item => {
				if (item.id == goodsinfo.id) {
					item.count += parseInt(goodsinfo.count)
					flag = true
					return true
				}
			})
			
			// 如果最终循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到购物车中
			if (!flag) {
				state.car.push(goodsinfo)
			}

			// 当更新 car 之后，把 car 数组，存储到 本地的 localstorage 中
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		removeFormCar(state, id) {
			state.car.some((item, i) => {
				if (item.id == id) {
					state.car.splice(i, 1)
					return true
				}
			})
			// 将删除完毕后的最新的购物车数据，同步到本地存储中
			
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsInfo(state, goodsinfo) {
			// 修改购物车中商品的数量
			// 分析：
			state.car.some(item => {
				if (item.id == goodsinfo.id) {
					item.count = parseInt(goodsinfo.count)
					return true
				}
			})
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsSelected(state, info) {
			state.car.some(item => {
				if (item.id == info.id) {
					item.selected = info.selected
				}
			})
			localStorage.setItem('car', JSON.stringify(state.car))
		}
	},
	getters: {
		getGoodsCount(state) {
			var o = {}
			state.car.forEach(item => {
				o[item.id] = item.count
			})
			return o
		},
		getAllCount(state) {
			var c = 0
			state.car.forEach(item => {
				c += item.count
			})
			return c
		},
		getGoodsSelected(state) {
			var o = {}
			state.car.forEach(item => {
				o[item.id] = item.selected
			})
			return o
		},
		getGoodsCountAndAmount(state) {
			var o = {
				count: 0, //勾选的数量
				amount: 0  // 勾选的总价
			}
			state.car.forEach(item => {
				if (item.selected) {
					o.count += item.count
					o.amount += item.price * item.count
				}
			})
			return o
		}
	}
})




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
	render: c => c(app),
	// 挂在路由对象到 WM 实例上
	router,
	// 挂载 store 状态管理对象
	store
})
