<template>
	<div class="goods-list">
		<router-link class="goods-item" v-for="item in list" :key="item.id" tag="div" :to="'/home/goodsinfo/' + item.id">
			<img :src="item.img_url">
			<h1 class="title">{{ item.title }}</h1>
			<div class="info">
				<p class="price">
					<span class="now">{{ item.market_price }}</span>
					<span class="old">{{ item.sell_price }}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{ item.stock_quantity }}件</span>
				</p>
			</div>
		</router-link>
		
	</div>
</template>

<script>
	
	import { Toast } from 'mint-ui'

	export default {
		data() {
			return {
				pageIndex: 1,
				list: []
			}
		},
		created() {
			this.getGoodsList(1)
		},
		methods: {
			getGoodsList(pageIndex) {
				this.$http.get("api/getgoods?pageindex=" + pageIndex)
					.then(result => {
						if (result.body.status === 0) {
							// console.log(result.body)
							this.list = result.body.message
						}
					})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.goods-list {
		padding: 7px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.goods-item {
			width: 49%;
			border: 1px solid #ccc;
			box-shadow: 0 0 8px #ccc;
			margin: 4px 0;
			padding: 2px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			min-height: 293px;

			img {
				width: 100%;
			}
			.title{
				font-size: 14px;
			}
			.info {
				background-color: #eee;
				p {
					margin: 0;
					padding: 5px;
				}
				.price {
					.now {
						color: red;
						font-weight: bold;
						font-size: 16px;
					}
					.old {
						text-decoration: line-through;
						font-size: 12px;
						margin-left: 10px;
					}
				}
				.sell {
					display:flex;
					justify-content: space-between;
					font-size: 13px;
					span {

					}
				}
			}
		}
	}
</style>
