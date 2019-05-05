<template>
	<div class="goods-info">
		
		<transition
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter">
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>

		<!-- 商品轮播区域 -->
		<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
					</div>
				</div>
		</div>

		<div class="mui-card">
			<div class="mui-card-header">{{ GoodsInfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价: <del>￥{{ GoodsInfo.market_price }}</del>&nbsp;&nbsp;销售价: <span class="sell_price">￥{{ GoodsInfo.sell_price }}</span>
					</p>
					<p>
						购买数量: <numbox @getcount="getSelectedCount" :max="GoodsInfo.stock_quantity"></numbox>
					</p>
					<p class="buy">
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
						<!-- 分析：如何实现加入购物车的时候，拿到 选择的数量 -->
						<!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面，数字属于 numberbox 组件 -->
						<!-- 2. 由于涉及的到了 父子组件的嵌套，所以无法直接在 goodsinfo 页面中获取到选中的商品数量值 -->
						<!-- 3. 怎么解决这个问题：涉及到了子组件向父组件传值（事件调用机制） -->
						<!-- 4. 事件调用的本质：
						父向子传递方法，子调用这个方法，同时把数据当做参数传递给这个方法 -->
					</p>
				</div>
			</div>
		</div>

		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号: {{ GoodsInfo.goods_no }}</p>
					<p>库存情况: {{ GoodsInfo.stock_quantity }}件</p>
					<p>上架时间: {{ GoodsInfo.add_time | dataFormat }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
				<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import swiper from "../subcomponents/swiper.vue"
	import numbox from "../subcomponents/goodsinfo_numbox.vue"
	export default {
		data() {
			return {
				id: this.$route.params.id,
				lunbotuList: [],
				GoodsInfo: {},
				// 控制小球的隐藏和显示的标识符
				ballFlag: false,
				// 保存用户选中的商品数量，默认认为用户买1个
				selectedCount: 1
			}
		},
		created() {
			this.getinfo(),
			this.getLunbotu()
		},
		methods: {
			getLunbotu() {
				this.$http.get("api/getthumimages/" + this.id).then(result => {
					// console.log(result.body)
					if (result.body.status === 0) {
						result.body.message.forEach(item => {
							item.img = item.src
						})
						this.lunbotuList = result.body.message
					}
				})
			},
			getinfo() {
				this.$http.get("api/goods/getinfo/" + this.id).then(result => {
					if (result.body.status === 0) {
						this.GoodsInfo = result.body.message[0]
						// console.log(this.GoodsInfo)
					}
				})
			},
			goComment(id) {
				this.$router.push({ name: "goodscomment", params: { id } })
			},
			goDesc(id) {
				this.$router.push({ name: "goodsdesc", params: { id } })
			},
			addToShopCar() {
				this.ballFlag = !this.ballFlag
			},
			beforeEnter(el) {
				el.style.transform = "translate(0, 0)"
			},
			enter(el, done) {
				el.offsetWidth
				// 小球动画优化思路：
				// 1. 线分析导致动画不准确的原因： 我们把小球最终位移到的位置，已经局限在了某一分辨率下的 滚动条为滚动的情况下
				// 2. 只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离之后，问题就出现了
				// 3. 因此，我们经过分析得出结论：不能把 位置的横纵坐标 直接写死了，而是应该根据不同的情况，动态的计算这个坐标值
				// 4. 经过分析得出解题思路：先得到 徽标的横纵坐标，在得到小球的横纵坐标，然后让 y 值求差，x 值求差，得到的结果就是横纵坐标要位移的距离
				// 5. 如何 获取 徽标和小球的位置： domObject.getBoundingClientRect()

				// 获取小球在页面中的位置
				const ballPosition = this.$refs.ball.getBoundingClientRect();
				// 获取 徽标 在页面中的位置
				const badgePosition = document.getElementById("badge").getBoundingClientRect();

				const xDist = badgePosition.left - ballPosition.left;
				const yDist = badgePosition.top - ballPosition.top;

				el.style.transform = `translate(${xDist}px, ${yDist}px)`;

				el.style.transition = "all 0.5s cubic-bezier(.1,-0.29,1,.61)"

				done()

			},
			afterEnter(el) {
				this.ballFlag = !this.ballFlag
			},
			getSelectedCount(count) {
				this.selectedCount = count
				console.log("父组件拿到的数量值为： " + this.selectedCount)
			}
		},
		components: {
			swiper,
			numbox
		}
	};
</script>

<style lang="scss" scoped>
	.goods-info {
		p {
			margin-bottom: 10px;
			.sell_price {
				font-size: 16px;
				color: red;
				font-weight: bold;
			}
		}
		.mui-card-footer {
			display: block;
			button {
				margin: 10px 0;
			}
		}
		.ball {
			width: 15px;
			height: 15px;
			background-color: red;
			border-radius: 50%;
			position: absolute;
			left: 142px;
			top: 389px;
			z-index: 99;
		}
	}
</style>
