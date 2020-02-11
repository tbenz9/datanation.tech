<template>
	<div class="page page-browse">
		<div class="files-list">
			<file-item v-for="file in files" :file="file" :key="file.fileLink" />
		</div>
		<router-link :to="{ name: 'addSkylink' }" class="btn btn-add"><icon icon='plus' /></router-link>
	</div>
</template>

<script>
import { getFiles } from '@/api';

import FileItem from '@/components/FileItem';

export default {
	components: {
		FileItem
	},
	data() {
		return {
			files: []
		};
	},
	async beforeMount() {
		try {
			await this.loadFiles();
		} catch (ex) {
			console.error('Browse.beforeMount', ex);
		}
	},
	methods: {
		async loadFiles() {
			this.files = await getFiles();
		}
	}
};
</script>

<style lang="stylus" scoped>
.btn.btn-add {
	position: absolute;
	display: inline-block;
	bottom: 45px;
	right: 15px;
	width: 45px;
	height: 45px;
	padding: 0;
	margin: 0;
	font-size: 1rem;
	line-height: 45px;
	vertical-align: middle;
	text-align: center;
	background: primary;
	color: rgba(255, 255, 255, 0.84);
	border: none;
	outline: none;
	border-radius: 100%;
	box-shadow: global-shadow;
	cursor: pointer;

	svg {
		margin: 0;
	}
}
</style>