<template>
<el-config-provider namespace="ch">
	<div :class="$style.wrapper">
		<span>popup</span>
	</div>
	<el-button>23</el-button>
	<div class="g-fs-20 g-p-20">2</div>
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
	font-size: 30px;
	span {
		color: #2c3e50;
	}
}
</style>
