<template>
	<div class="container relative">
		<div
			class="w-[500px] h-[500px] absolute top-0 right-0 -z-10 filter blur-2xl opacity-50 dark:opacity-30"
		>
			<div class="w-full h-full animate-morph-rotate-scale">
				<div
					class="absolute bottom-6 right-0 w-[400px] h-[300px] bg-[#FA8792] rounded-full"
				/>
				<div
					class="absolute top-0 right-0 w-[550px] h-[350px] bg-[#FBF8B3] rounded-full opacity-50 dark:opacity-80 animate-blob"
				/>
				<div
					class="absolute top-0 left-0 w-[250px] h-[250px] bg-[#70E6FB] rounded-full opacity-70 animate-blob animation-delay-4000"
				/>
				<div
					class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#561BBE] rounded-full dark:opacity-70 animation-delay-2000"
				/>
				<div
					class="absolute bottom-24 right-24 w-[180px] h-[180px] bg-gradient-to-r from-[#8627A4] to-[#A42754] dark:opacity-70 rounded-full animate-blob"
				/>
				<!-- <div class="absolute inset-y-0 inset-x-0 bg-white"></div> -->
			</div>
		</div>
		<ul class="list-disc list-inside">
			<li v-for="post in response" :key="post.id">
				<span>{{ post.title.rendered }}</span>
			</li>
		</ul>
		<div class="flex flex-col justify-items-end items-start gap-3 text-sm">
			<UIDropdown :type="ButtonStyle.XLIGHT" label="test">
				<ul class="list-disc list-inside">
					<li v-for="post in response" :key="post.id">
						<span>{{ post.title.rendered }}</span>
					</li>
				</ul>
				<div class="fixed top-0 right-0">Child Fixed</div>
			</UIDropdown>
			<form
				@submit.prevent=""
				class="flex flex-col gap-5 items-start w-[300px]"
			>
				<UIInput
					v-model="testInput"
					input-id="one"
					:input-type="InputType.TEXT"
					input-label="Email"
					input-placeholder="example@email.com"
					class="w-full"
				/>
				<UISelect
					select-id="selectTets"
					label="Selct one"
					placeholder="Select one fdsgfdsdfg"
					:selected="selectedItem?.name"
					v-model="selectedItem"
					:items="selectItems"
					class="w-full"
					@select-item="testing"
				/>
				<UIButton
					:button-style="ButtonStyle.DARK"
					:button-type="ButtonType.SUBMIT"
				>
					Submit
				</UIButton>
			</form>

			<UIButton
				:button-style="ButtonStyle.NONE"
				icon="plus"
				class="text-brand-gray font-thin"
			>
				Add filter
			</UIButton>
			<UIButton :button-style="ButtonStyle.LIGHT" icon="bars-filter">
				Filters
			</UIButton>
		</div>
    <div v-if="productsPending">Loading products...</div>
    <template v-else>
      <div v-for="product in products" :key="product.id">
        {{ product.name }}
      </div>
    </template>
	</div>
</template>

<script setup lang="ts">
	import { ButtonType, IconPosition } from '@/components/UI/Button.vue';
	import { ButtonStyle } from '@/components/UI/Button.vue';
	import { InputType } from '@/components/UI/Input.vue';
	import { type Item } from '@/components/UI/Select.vue';

	const { data: response } = useFetch<any>(
		'http://nixzt.wpengine.com/wp-json/wp/v2/posts'
	);

	const { data: products, pending: productsPending } = useAsyncData(
		'products',
		() => $fetch('http://nixzt.loc/wp-json/wc/v3/products'),
		{
			transform: (products) => {
				return products as Array<Item>;
			},
		}
	);

	const testInput = ref<string>();
	const selectItems = reactive<Item[]>([
		// { id: 1, name: 'Select one', placeholder: true },
		{ id: 2, name: 'sting' },
		{ id: 3, name: 'sting 2' },
		{ id: 4, name: 'sting 3' },
	]);
	const selectedItem = ref<Item>();
	const testing = (item: any) => {
		selectedItem.value = item;
	};
</script>

<style lang="scss">
	// .clip-path-test {
	//   clip-path: polygon(
	//     17.988% 12.741%,
	//     17.988% 12.741%,
	//     20.187% 9.63%,
	//     22.717% 6.925%,
	//     25.532% 4.644%,
	//     28.585% 2.802%,
	//     31.828% 1.415%,
	//     35.216% 0.501%,
	//     38.701% 0.075%,
	//     42.236% 0.153%,
	//     45.774% 0.752%,
	//     49.268% 1.888%,
	//     83.19% 15.729%,
	//     83.19% 15.729%,
	//     86.12% 17.15%,
	//     88.826% 18.915%,
	//     91.285% 20.993%,
	//     93.481% 23.355%,
	//     95.391% 25.97%,
	//     96.999% 28.807%,
	//     98.282% 31.838%,
	//     99.224% 35.03%,
	//     99.803% 38.355%,
	//     100% 41.783%,
	//     100% 72.105%,
	//     100% 72.105%,
	//     99.658% 76.629%,
	//     98.666% 80.922%,
	//     97.08% 84.924%,
	//     94.953% 88.579%,
	//     92.339% 91.83%,
	//     89.291% 94.618%,
	//     85.863% 96.886%,
	//     82.11% 98.578%,
	//     78.085% 99.635%,
	//     73.843% 100%,
	//     44.099% 100%,
	//     44.099% 100%,
	//     41.84% 99.896%,
	//     39.614% 99.587%,
	//     37.433% 99.079%,
	//     35.308% 98.378%,
	//     33.25% 97.488%,
	//     31.27% 96.415%,
	//     29.379% 95.164%,
	//     27.589% 93.742%,
	//     25.911% 92.153%,
	//     24.355% 90.403%,
	//     6.567% 68.575%,
	//     6.567% 68.575%,
	//     4.473% 65.636%,
	//     2.789% 62.485%,
	//     1.516% 59.168%,
	//     0.657% 55.73%,
	//     0.216% 52.216%,
	//     0.196% 48.67%,
	//     0.599% 45.138%,
	//     1.428% 41.665%,
	//     2.687% 38.296%,
	//     4.378% 35.076%,
	//     17.988% 12.741%
	//   );
	// }
	// .clip-path-test-v2 {
	//   clip-path: polygon(
	//     0.298% 29.722%,
	//     0.298% 29.722%,
	//     0.623% 22.958%,
	//     3.337% 17.505%,
	//     8.03% 13.192%,
	//     14.291% 9.85%,
	//     21.71% 7.309%,
	//     29.875% 5.4%,
	//     38.377% 3.951%,
	//     46.805% 2.794%,
	//     54.747% 1.759%,
	//     61.795% 0.675%,
	//     61.795% 0.675%,
	//     68.009% 0.055%,
	//     73.718% 0.491%,
	//     78.913% 1.936%,
	//     83.583% 4.342%,
	//     87.717% 7.659%,
	//     91.306% 11.841%,
	//     94.339% 16.838%,
	//     96.806% 22.603%,
	//     98.696% 29.088%,
	//     100% 36.244%,
	//     100% 36.244%,
	//     97.91% 44.287%,
	//     95.151% 51.576%,
	//     91.84% 58.254%,
	//     88.088% 64.466%,
	//     84.012% 70.355%,
	//     79.725% 76.066%,
	//     75.34% 81.742%,
	//     70.973% 87.527%,
	//     66.736% 93.565%,
	//     62.746% 100%,
	//     62.746% 100%,
	//     57.43% 105.203%,
	//     51.064% 105.111%,
	//     43.964% 100.688%,
	//     36.447% 92.903%,
	//     28.829% 82.722%,
	//     21.427% 71.112%,
	//     14.556% 59.041%,
	//     8.534% 47.474%,
	//     3.676% 37.379%,
	//     0.298% 29.722%
	//   );
	// }
	.animation-delay-2000 {
		animation-delay: 2s;
	}
	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>
