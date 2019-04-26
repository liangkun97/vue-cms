<template>
	<div class="cmt-container">
		<h3>发表评论</h3>
		<textarea placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120"></textarea>
		<mt-button type="primary" size="large">发表评论</mt-button>

		<div class="cmt-list">
			<div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
				<div class="cmt-title">
					第{{ i + 1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dataFormat }}
				</div>
				<div class="cmt-body">
					{{ item.content === "" ? "这个用户很懒，什么都没有留下" : item.content }}
				</div>
			</div>
		</div>
		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>


<script>
	import { Toast } from 'mint-ui'

	export default {
		data() {
			return {
				pageIndex: 1,
				comments: []
			}
		},
		created() {
			this.getComments()
		},
		methods: {
			getComments() {
				this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result => {
					if (result.body.status === 0) {
						console.log(result.body)
						this.comments = this.comments.concat(result.body.message)
					} else {
						Toast("获取评论失败！")
					}
				})
			},
			getMore() {
				this.pageIndex ++
				this.getComments()
			}
		},
		props: ["id"]
	};

</script>

<style scoped lang="scss">
	.cmt-container {
		h3 {
			font-size: 18px;
		}
		textarea {
			margin: 0;
			height: 85px;
			font-size: 14px;
		}
		.cmt-list {
			margin: 5px 0;
			.cmt-item {
					font-size: 14px;
				.cmt-title {
					line-height: 30px;
					background-color: #ccc;
				}
				.cmt-body {
					line-height: 35px;
					text-indent: 2em;
				}
			}
		}
	}
</style>






