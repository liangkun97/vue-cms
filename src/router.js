import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './component/tabbar/HomeContainer.vue'
import MemberContainer from './component/tabbar/MemberContainer.vue'
import ShopcarContainer from './component/tabbar/ShopcarContainer.vue'
import SearchContainer from './component/tabbar/SearchContainer.vue'

import NewsInfo from './component/news/NewsInfo.vue'
import NewsList from './component/news/NewsList.vue'

import PhotoList from './component/photos/PhotoList.vue'
import PhotoInfo from './component/photos/PhotoInfo.vue'
import GoodsList from './component/goods/GoodsList.vue'
import GoodsInfo from './component/goods/GoodsInfo.vue'
import GoodsComment from './component/goods/GoodsComment.vue'
import GoodsDesc from './component/goods/GoodsDesc.vue'



// 创建路由对象
var router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: HomeContainer },
		{ path: '/member', component: MemberContainer },
		{ path: '/shopcar', component: ShopcarContainer },
		{ path: '/search', component: SearchContainer },
		{ path: '/home/newslist', component: NewsList },
		{ path: '/home/newsinfo/:id', component: NewsInfo },
		{ path: '/home/photolist/', component: PhotoList },
		{ path: '/home/photoinfo/:id', component: PhotoInfo },
		{ path: '/home/goodslist', component: GoodsList },
		{ path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
		{ path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment' },
		{ path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' }
	],
	// 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
	linkActiveClass: 'mui-active'
})



export default router