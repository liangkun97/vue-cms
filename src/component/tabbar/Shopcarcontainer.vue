<template>
	<div class="shopcar-container">
		<!-- 商品展示区 -->
		<div class="goods-list">
			<div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch
							v-model="$store.getters.getGoodsSelected[item.id]"
							@change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"
						></mt-switch>
						<img :src="item.thumb_path">
						<div class="info">
							<h1>{{ item.title }}</h1>
							<p>
								<span class="price">￥{{ item.sell_price }}</span>
								<numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
								<!-- 问题：如何从购物车中获取商品的数量
										1. 先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环这条商品的 id，作为对象的属性名，就会得到一个对象： { 88: 2, 89: 1}
								 -->
								<a href="#" @click.prevent="remove(item.id, i)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 结算区 -->
		<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
							<p>总计（不含运费）</p>
							<p>已选择商品 <span>{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价 <span>￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
						</div>
						<mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
			<p>{{ $store.getters.getGoodsSelected }}</p>
	</div>
</template>

<script>
	import numbox from '../subcomponents/goodsinfo_numbox.vue'

	export default {
		data() {
			return {
				goodslist: []
			}
		},
		created() {
			this.getGoodsList();
		},
		methods: {
			getGoodsList() {
				var idArr = [];
				// 1.获取到 store 中所有的商品的 id，然后拼接出一个 逗号分隔的字符串
				this.$store.state.car.forEach(item => idArr.push(item.id))
				// 如果 购物车 中没有商品，则直接返回，不需要请求数据接口，否则会报错
				
				if (idArr.length <= 0) {
					return
				}

				this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(result => {
					if (result.body.status === 0) {
						this.goodslist = result.body.message
						console.log(this.goodslist)
					}
				})
			},
			remove(id, index) {
				this.goodslist.splice(index, 1)
				this.$store.commit("removeFormCar", id)
			},
			selectedChanged(id, val) {
				this.$store.commit("updateGoodsSelected", { id, selected: val})
			}
		},
		components: {
			numbox
		}
	};

</script>

<style scoped lang="scss">
	.shopcar-container {
		background-color:#eee;
		overflow: hidden;
		.goods-list {
			.mui-card-content-inner {
				display: flex;
				align-items: center;
			}
			img {
				width: 60px;
				height: 60px;
			}
			h1 {
				font-size: 13px;
			}
			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.price {
					color: red;
					font-weight: bold;
				}
			}
		}
		.jiesuan {
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
				color: red;
				font-weight: bold;
				font-size: 16px;
			}
		}
	}
</style>


