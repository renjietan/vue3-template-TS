<template>
	<vc-config-provider :cesium-path="vcConfig.cesiumPath">
		<vc-viewer></vc-viewer>
	</vc-config-provider>
</template>
<script setup>
	import { reactive } from 'vue'
	import { VcConfigProvider, VcViewer } from 'vue-cesium'

	const vcConfig = reactive({
		cesiumPath: 'https://unpkg.com/cesium@latest/Build/Cesium/Cesium.js'
	})
</script>
<style lang="scss" scoped>
	.cesium-viewer-bottom {
		display: none;
	}
	:deep(.cesium-viewer-bottom) {
		display: none;
	}
</style>