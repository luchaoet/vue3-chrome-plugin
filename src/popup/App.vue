<template>
	<div :class="$style.wrapper">popup</div>
  <el-button>23</el-button>
	<div class="g-fs-20 g-p-20">2</div>
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

<style module>
.wrapper {
	color: #2c3e50;
	font-size: 30px;
}
</style>
