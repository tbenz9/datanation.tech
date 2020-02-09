<template>
	<div id="app">
		<div id="nav">
			<!--<router-link to="/">Browse</router-link>-->
		</div>
		<transition name="fade" mode="out-in" appear>
			<router-view />
		</transition>
	</div>
</template>

<style lang="stylus">
@require "./styles/global";

#app {
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
