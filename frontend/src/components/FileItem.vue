<template>
	<div class="panel file-panel">
		<div class="file-icon"><icon :icon="typeIcon" /></div>
		<div class="file-name">{{ name }}</div>
		<div class="file-link">
			<a :href="downloadLink" :download="name" target="_blank"><icon icon="download" /></a>
		</div>
		<div class="file-description">
			{{ file.fileDescription }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		file: Object
	},
	computed: {
		name() {
			if (!this.file || typeof this.file.fileName !== 'string')
				return 'unknown';

			return this.file.fileName;
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
		},
		downloadLink() {
			if (!this.file || typeof this.file.fileLink !== 'string')
				return '#';

			let link = this.file.fileLink;

			if (link.indexOf('sia://') === 0)
				link = link.substring(6);

			return `https://skynet.siacentral.com/${link}`;
		}
	}
};
</script>

<style lang="stylus" scoped>
.file-panel {
	display: grid;
	grid-template-columns: 24px minmax(0, 1fr) auto;
	grid-template-areas: "a b c" \ "d d d";
	grid-gap: 15px;
	align-items: center;
	margin-bottom: 15px;
}

.file-icon {
	grid-area: a;
	color: primary;

	svg {
		width: 24px;
		height: 24px;
		margin: 0;
	}
}

.file-link {
	grid-area: c;
}

.file-description {
	grid-area: d;
	border-top: 1px solid light-gray;
	padding-top: 15px;
}
</style>