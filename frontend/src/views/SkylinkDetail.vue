<template>
	<div class="page page-detail">
		<h2><icon :icon="typeIcon" class="file-icon" />{{ name }}</h2>
		<div class="panel panel-details">
			<h3>{{ link }}</h3>
			<div class="file-description">{{ description }}</div>
			<div class="portal-providers">
				<a :href="downloadLink('https://siasky.net')">SiaSky</a>
				<a :href="downloadLink('https://sialoop.net')">SiaLoop</a>
				<a :href="downloadLink('https://skynet.luxor.tech')">Luxor</a>
				<a :href="downloadLink('https://skynet.tutemwesi.com')">Tutemwesi</a>
				<a :href="downloadLink('https://siacdn.com')">SiaCDN</a>
				<a :href="downloadLink('https://vault.lightspeedhosting.com')">LightSpeed Hosting</a>
			</div>
			<div class="file-meta">
				<span>Uploader: {{ uploader }}</span>
				<span>Size: <span v-html="fileSize" /></span>
				<span>Upload Date: {{ dateStr }}</span>
			</div>
		</div>
		<h3>Comments</h3>
		<div class="panel panel-new-comment">
			<div class="control">
				<textarea />
			</div>
			<div class="buttons text-right">
				<button class="btn btn-primary btn-inline">Comment</button>
			</div>
		</div>
		<div class="panel panel-comments">
			<icon icon="comments" class="empty-icon" />
			<h3 class="text-center">No comments have been posted yet</h3>
		</div>
	</div>
</template>

<script>
import { getFile } from '@/api';
import { formatByteString } from '@/format';

export default {
	props: {
		skylink: String
	},
	data() {
		return {
			file: null,
			comments: []
		};
	},
	computed: {
		name() {
			if (!this.file || typeof this.file.fileName !== 'string')
				return 'unknown';

			return this.file.fileName;
		},
		uploader() {
			if (!this.file || typeof this.file.fileUploader !== 'string')
				return 'Anonymous';

			return this.file.fileUploader;
		},
		description() {
			if (!this.file || typeof this.file.fileDescription !== 'string')
				return 'unknown';

			return this.file.fileDescription;
		},
		link() {
			if (!this.file || typeof this.file.fileLink !== 'string')
				return 'sia://';

			return this.file.fileLink;
		},
		fileSize() {
			let format;

			if (!this.file.fileSize || typeof this.file.fileSize !== 'number' || !isFinite(this.file.fileSize))
				format = formatByteString(0, 2);
			else
				format = formatByteString(this.file.fileSize, 2);

			return `${format.value} <span class="label-display">${format.label}</span>`;
		},
		uploadDate() {
			if (!this.file.fileUploadedTimestamp || typeof this.file.fileUploadedTimestamp !== 'number' || !isFinite(this.file.fileUploadedTimestamp))
				return new Date();

			return new Date(this.file.fileUploadedTimestamp * 1000);
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
	},
	async beforeMount() {
		try {
			this.file = await getFile(this.skylink);
		} catch (ex) {
			console.error('SkylinkDetail.beforeMount', ex);
		}
	},
	methods: {
		downloadLink(base) {
			return `${base}/${this.skylink}`;
		}
	}
};
</script>

<style lang="stylus" scoped>
.file-icon {
	color: primary;
	margin-right: 15px;
}
.page-detail {
	width: 100%;
	align-content: start;

	> h2, > h3 {
		margin: 0 0 15px;
		grid-column: 1 / -1;
		color: rgba(0, 0, 0, 0.54);
	}

	> .panel {
		margin-bottom: 15px;
	}
}

.file-description {
	border-top: 1px solid light-gray;
	border-bottom: 1px solid light-gray;
	padding: 15px 0;
	margin-bottom: 15px;
}

.portal-providers {
	margin-bottom: 15px;

	> a {
		display: block;
		margin: 0 5px 5px 0;

		@media screen and (min-width: 767px) {
			display: inline-block;
		}
	}
}

.file-meta {
	color: rgba(0, 0, 0, 0.54);

	> span {
		display: block;
		margin: 0 5px 5px 0;

		@media screen and (min-width: 767px) {
			display: inline-block;
		}
	}
}

.panel-new-comment {
	display: grid;
	grid-column: 1 / -1;
	align-items: center;

	.control {
		height: 100%;
		margin-bottom: 15px;

		textarea {
			height: 100%;
		}
	}
}

.panel-comments {
	grid-column: 1 / -1;
	text-align: center;

	.empty-icon {
		font-size: 3rem;
		color: primary;
		margin-bottom: 15px;
	}
}
</style>
