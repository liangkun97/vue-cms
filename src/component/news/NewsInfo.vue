<template>
	<div class="newsinfo-container">
		<h3 class="title">{{ newsinfo.title }}</h3>
		<p class="subtitle">
			<span>发表时间：{{ newsinfo.add_time | dataFormat }}</span>
			<span>点击{{ newsinfo.click }}次</span>
		</p>
		
		<hr>
		
		<div class="content" v-html="newsinfo.content"></div>
		<comment-box :id="this.id"></comment-box>
	</div>
</template>

<script>
	// 1.导入评论子组件
	import comment from '../subcomponents/comment.vue'
	import { Toast } from 'mint-ui'

	export default {
		data() {
			return {
				id: this.$route.params.id,
				newsinfo: {}
			}
		},
		created() {
			this.getNewsInfo()
		},
		methods: {
			getNewsInfo() {
				this.$http.get("api/getnew/" + this.id).then(result => {
						console.log(result.body)
					if (result.body.status === 0) {
						this.newsinfo = result.body.message[0]
					} else {
						Toast("获取新闻失败！")
					}
				})
			}
		},
		components: {
			"comment-box": comment
		}
	};


</script>

<style lang="scss" scoped>
	.newsinfo-container {
		padding: 0px 4px;

		.title {
			color: red;
			font-size: 16px;
			text-align: center;
			margin: 15px 0;
		}

		.subtitle {
			display: flex;
			font-size: 13px;
			color: #226aff;
			justify-content: space-between;
		}

		.content {
			img {
				width: 100%;
			}
		}
	}

</style>


