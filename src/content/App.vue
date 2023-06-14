<template>
	<div :class="$style.wrapper">test</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
	components: {},
	setup(props, { emit }) {
		const str: string = "123";
		const state = reactive({});
		const methods = reactive({});

		return {
			...toRefs(state),
			...toRefs(methods),
		};
	},
});
</script>
<style module>
.wrapper {
	color: #2c3e50;
	width: 200px;
	background-color: #ff7700;
	position: fixed;
	top: 40px;
	right: 10px;
	z-index: 999;
	border-radius: 4px;
	padding: 10px;
	font-size: 20px;
	color: #fff;
}
</style>
