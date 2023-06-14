<template>
<el-config-provider namespace="ch">
	<div :class="$style.wrapper">panel1</div>
	<el-button>11</el-button>
</el-config-provider>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
	components: {},
	setup(props, { emit }) {
		const state = reactive({});
		const methods = reactive({});

		return {
			...toRefs(state),
			...toRefs(methods),
		};
	},
});
</script>

<style lang="scss" module>
.wrapper {
	color: #2c3e50;
}
</style>
