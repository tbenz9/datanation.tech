<template>
	<div class="page page-add-skylink">
		<form class="panel" @submit="onAddLink">
			<div class="control">
				<label>Skylink</label>
				<input type="text" placeholder="sia://" v-model="fileLink" />
				<label class="error" v-if="errors.fileLink">{{ errors.fileLink }}</label>
			</div>
			<div class="control">
				<label>File Name</label>
				<input type="text" v-model="fileName" />
				<label class="error" v-if="errors.fileName">{{ errors.fileName }}</label>
			</div>
			<div class="control">
				<label>File Type</label>
				<select v-model="fileType">
					<option>Image</option>
					<option>Video</option>
					<option>Document</option>
					<option>Archive</option>
					<option>Text</option>
					<option>Other</option>
				</select>
				<label class="error" v-if="errors.fileType">{{ errors.fileType }}</label>
			</div>
			<div class="control">
				<label>Category</label>
				<select v-model.number="fileCategory">
					<optgroup label="Audio">
						<option value="101">Music</option>
						<option value="102">Audio books</option>
						<option value="103">Sound clips</option>
						<option value="104">FLAC</option>
						<option value="199">Other</option>
					</optgroup>
					<optgroup label="Video">
						<option value="201">Movies</option>
						<option value="202">Movies DVDR</option>
						<option value="203">Music videos</option>
						<option value="204">Movie clips</option>
						<option value="205">TV shows</option>
						<option value="206">Handheld</option>
						<option value="207">HD - Movies</option>
						<option value="208">HD - TV shows</option>
						<option value="209">3D</option>
						<option value="299">Other</option>
					</optgroup>
					<optgroup label="Applications">
						<option value="301">Windows</option>
						<option value="302">Mac</option>
						<option value="303">UNIX</option>
						<option value="304">Handheld</option>
						<option value="305">IOS (iPad/iPhone)</option>
						<option value="306">Android</option>
						<option value="399">Other OS</option>
					</optgroup>
					<optgroup label="Games">
						<option value="401">PC</option>
						<option value="402">Mac</option>
						<option value="403">PSx</option>
						<option value="404">XBOX360</option>
						<option value="405">Wii</option>
						<option value="406">Handheld</option>
						<option value="407">IOS (iPad/iPhone)</option>
						<option value="408">Android</option>
						<option value="499">Other</option>
					</optgroup>
					<optgroup label="Porn">
						<option value="501">Movies</option>
						<option value="502">Movies DVDR</option>
						<option value="503">Pictures</option>
						<option value="504">Games</option>
						<option value="505">HD - Movies</option>
						<option value="506">Movie clips</option>
						<option value="599">Other</option>
					</optgroup>
					<optgroup label="Other">
						<option value="601">E-books</option>
						<option value="602">Comics</option>
						<option value="603">Pictures</option>
						<option value="604">Covers</option>
						<option value="605">Physibles</option>
						<option value="699">Other</option>
					</optgroup>
				</select>
				<label class="error" v-if="errors.fileCategory">{{ errors.fileCategory }}</label>
			</div>
			<div class="control">
				<label>Uploader</label>
				<input type="text" placeholder="Anonymous" v-model="fileUploadedUser" />
			</div>
			<div class="control">
				<label>Description</label>
				<textarea v-model="fileDescription" />
			</div>
			<div class="buttons">
				<button class="btn btn-primary btn-inline">Add</button>
			</div>
		</form>
	</div>
</template>

<script>
import { decodeURLSafe } from '@stablelib/base64';
import { addFile } from '@/api';

export default {
	data() {
		return {
			errors: {},
			fileLink: '',
			fileName: '',
			fileType: 'Other',
			fileCategory: 0,
			fileUploadedTimestamp: '',
			fileUploadedUser: '',
			fileSize: 0,
			fileDescription: ''
		};
	},
	methods: {
		validate() {
			const errors = {};

			try {
				const link = this.fileLink.substring(6);

				if (this.fileLink.indexOf('sia://') !== 0)
					errors.fileLink = 'Skylinks must start with sia://';
				else if (decodeURLSafe(link).length !== 34)
					errors.fileLink = 'Invalid Skylink';

				if (typeof this.fileCategory !== 'number' || this.fileCategory === 0)
					errors.fileCategory = 'Please select a category';
			} catch (ex) {
				errors.fileLink = 'Invalid Skylink';
			}

			if (this.fileName.length === 0)
				errors.fileName = 'File name is required';

			if (this.fileType.length === 0)
				errors.fileType = 'File type is required';

			this.errors = errors;

			return Object.keys(errors).length === 0;
		},
		async onAddLink(e) {
			try {
				e.preventDefault();
				e.stopPropagation();

				if (!this.validate())
					return;

				await addFile({
					fileLink: this.fileLink,
					fileName: this.fileName,
					fileType: this.fileType,
					fileCategory: this.fileCategory,
					fileUploadedTimestamp: Math.round(new Date().getTime() / 1000),
					fileUploadedUser: this.fileUploadedUser,
					fileSize: this.fileSize,
					fileDescription: this.fileDescription
				});

				this.$router.replace({ name: 'browse' });
			} catch (ex) {
				console.error('AddSkylink.onAddLink', ex);
			}
		}
	}
};
</script>

<style lang="stylus" scoped>
	.page-add-skylink {
		display: grid;
		align-content: safe center;
	}

	form {

	}
</style>