<template>
	<router-link :to="{ name: 'fileDetail', params: { skylink: id }}" class="panel file-panel">
		<div class="file-icon"><icon :icon="typeIcon" /></div>
		<div class="file-name">{{ name }}</div>
		<div class="file-size" v-html="fileSize" />
		<div class="file-upload">{{ dateStr }}</div>
	</router-link>
</template>

<script>
import { formatByteString } from '@/format';

export default {
	props: {
		file: Object
	},
	computed: {
		id() {
			if (!this.file || typeof this.file.fileLink !== 'string')
				return '#';

			if (this.file.fileLink.indexOf('sia://') === 0)
				return this.file.fileLink.substring(6);

			return this.file.fileLink;
		},
		name() {
			if (!this.file || typeof this.file.fileName !== 'string')
				return 'unknown';

			return this.file.fileName;
		},
		fileSize() {
			const format = formatByteString(0, 2);

			return `${format.value} <span class="label-display">${format.label}</span>`;
		},
		uploadDate() {
			return new Date();
		},
		dateStr() {
			return this.uploadDate.toLocaleString([], {
				year: 'numeric',
				month: 'short',
				day: '2-digit'
			});
		},
		typeIcon() {
			if (!this.file || typeof this.file.fileType !== 'string')
				return 'file';

			switch (this.file.fileType) {
			case 'Image':
				return 'camera';
			case 'Video':
				return 'video';
			case 'Document':
				return 'file-alt';
			case 'Archive':
				return 'file-archive';
			case 'Text':
				return 'align-left';
			default:
				return 'file';
			}
		}
	}
};
</script>

<style lang="stylus" scoped>
.file-panel {
	display: grid;
	width: 100%;
	grid-template-columns: 24px minmax(0, 1fr) repeat(2, auto);
	grid-gap: 15px;
	padding: 10px 15px;
	align-items: center;
	margin-bottom: 15px;
	color: rgba(0, 0, 0, 0.84);
	text-decoration: none;

	&:hover, &:active, &:focus {
		text-decoration: none;
	}
}

.file-icon {
	color: primary;

	svg {
		width: 24px;
		height: 24px;
		margin: 0;
	}
}
</style>