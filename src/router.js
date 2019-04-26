import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './component/tabbar/HomeContainer.vue'
import MemberContainer from './component/tabbar/MemberContainer.vue'
import ShopcarContainer from './component/tabbar/ShopcarContainer.vue'
import SearchContainer from './component/tabbar/SearchContainer.vue'

import NewsInfo from './component/news/NewsInfo.vue'
import NewsList from './component/news/NewsList.vue'


// 创建路由对象
var router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: HomeContainer },
		{ path: '/member', component: MemberContainer },
		{ path: '/shopcar', component: ShopcarContainer },
		{ path: '/search', component: SearchContainer },
		{ path: '/home/newslist', component: NewsList },
		{ path: '/home/newsinfo/:id', component: NewsInfo }
	],
	// 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
	linkActiveClass: 'mui-active'
})



export default router