<template>
	<div class="goods-desc">
		<h3 class="title">{{ GoodsDesc.title }}</h3>

		<hr>

		<div class="content" v-html="GoodsDesc.content"></div>		
	</div>

</template>
<script>
	export default {
		data() {
			return {
				GoodsDesc: {}
			}
		},
		created() {
			this.getdesc()
		},
		methods: {
			getdesc() {
				this.$http
					.get("api/goods/getdesc/" + this.$route.params.id)
					.then(result => {
						if (result.body.status === 0) {
							this.GoodsDesc = result.body.message[0]
							// console.log(result.body.message)
						}
					})
			}
		}
	};
</script>	
<style lang="scss">
	.goods-desc {
		padding: 4px;
		.title {
			font-size: 16px;
			color: #226aff;
			text-align: center;
			margin: 15px 0;
		}
		.content{
	    img{
	      width: 100%;
	    }
	  }
	}
</style>