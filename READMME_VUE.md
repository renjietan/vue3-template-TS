 ### 基础
 #### 错误信息监听
```
app.config.errorHandler = (err) => {
  /* 处理错误 */
}
```
#### 全局注册组件
```
app.component('TodoDeleteButton', TodoDeleteButton)
```
#### 
#### 指令
* v-html
* v-bind:id 或 :id
* {{ xxx.split('').reverse().join('') }}
* 绑定多个属性
    ```
    v-bind="objectOfAttrs"
    const objectOfAttrs = {
        id: 'container',
        class: 'wrapper'
    }
    ```
* 事件
    ```
    @click=“handleClick”
    v-on:click = “handleClick”
    // $event 内置变量
    @click="warn('Form cannot be submitted yet.', $event)"
    // 单击事件将停止传递
    <a @click.stop="doThis"></a>

    //提交事件将不再重新加载页面
    <form @submit.prevent="onSubmit"></form>

    // 修饰语可以使用链式书写
    <a @click.stop.prevent="doThat"></a>

    // 也可以只有修饰符
    <form @submit.prevent></form>

    // 仅当 event.target 是元素本身时才会触发事件处理器
    // 例如：事件处理器不来自子元素 
    <div @click.self="doThat">...</div>
    使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此使用 @click.prevent.self 会阻止**元素及其子元素的所有点击事件的默认行为，**而 @click.self.prevent 则只会阻止对元素本身的点击事件的默认行为。

    <!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
    <!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
    <div @click.capture="doThis">...</div>

    <!-- 点击事件最多被触发一次 -->
    <a @click.once="doThis"></a>

    <!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
    <!-- 以防其中包含 `event.preventDefault()` -->
    <div @scroll.passive="onScroll">...</div>

    <!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
    <input @keyup.enter="submit" />
    <input @keyup.page-down="onPageDown" />
    * .lazy： 默认情况下，v-model 会在每次 input 事件后更新数据 (IME 拼字阶段的状态例外)。你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据：
    * enter
    * tab
    * delete (捕获“Delete”和“Backspace”两个按键)
    * esc
    * space
    * up
    * down
    * left
    * right
    * ctrl
    * alt
    * shift
    * meta：在 Mac 键盘上，meta 是 Command 键 (⌘)。在 Windows 键盘上，meta 键是 Windows 键 (⊞)。在 Sun 微机系统键盘上，meta 是钻石键 (◆)。在某些键盘上，特别是 MIT 和 Lisp 机器的键盘及其后代版本的键盘，如 Knight 键盘，space-cadet 键盘，meta 都被标记为“META”。在 Symbolics 键盘上，meta 也被标识为“META”或“Meta”。
    ```
* 动态绑定（由于特殊字符的缘故，不可出现空格或引号）
    ```
    // 属性
    :[attributeName]="url"
   
    // 动态绑定事件
    @[eventName] = “handleClick”
    ```
### 响应式API
* 注册全局变量-reactive
```
import { reactive } from 'vue'
const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```
* 注册全局变量-ref
```
第一种
<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
const count = ref("11")
function increment() {
    count.value++;
}
第二种 获取DOM元素
const el = ref()
<div ref="el"></div>

```

* nextTick
```
import { nextTick } from 'vue'
nextTick(()=> {})
```
* computed
```
import { computed } from 'vue'
computed(() => {
    return count * 2
})
// getter setter
const comp = computed({
	get() {
		return state.count + count.value;
	},
	set(n: number) {
		state.count = n
		count.value = n
	}
})
// 给计算属性赋值
comp.value = 5
```
* class绑定
```
第一种
 :class="[{ active: isActive }, errorClass]"
第二种
 :class="{ active: isActive, 'text-danger': hasError }"
第三种
const classObject = reactive({
  active: true,
  'text-danger': false
})
<div :class="classObject"></div>
第四中 计算属性
const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
<div :class="classObject"></div>
第五种 模版
// myComponent
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span

<MyComponent class="baz" />

将被渲染为 
<p class="baz">Hi!</p>
<span>This is a child component</span>
```
* style绑定
```
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```
* v-if
```
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```
### 生命周期 
* onMounted 在组件挂载完成后执行
* onUpdated 组件因为响应式状态变更而更新其 DOM 树之后调用。
* onUnmounted 在组件实例被卸载之后调用。
* onBeforeMount 在组件被挂载之前被调用
* onBeforeUpdate 在组件即将因为响应式状态变更而更新其 DOM 树之前调用
* onBeforeUnmount 在组件实例被卸载之前调用 组件实例依然还保有全部的功能。
* onErrorCaptured 在捕获了后代组件传递的错误时调用。
* onRenderTracked 注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用
* onRenderTriggered 注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用。
* onActivated 若组件实例是 <KeepAlive> 缓存树的一部分，当组件被插入到 DOM 中时调用。
* onDeactivated 若组件实例是 <KeepAlive> 缓存树的一部分，当组件从 DOM 中被移除时调用。
* onServerPrefetch 注册一个异步函数，在组件实例在服务器上被渲染之前调用。 

### 注入 provide inject
// 主要用于解决 多个子孙组件嵌套时，root组件 可以讲值传递到 孙子组件中
```
一、基础用法
import { provide } from 'vue'
// 命名
provide('message', 'hello!')
// 获取值
const msg = inject('message')
// 使用
<button>{{ msg }}</button>

二、全局提供
app.provide('message', 'hello!')
```

### watch
```
const state = reactive({
    name: "",
    obj: {
        name: ""
    }
})
// 监听 字符串或 数字 等基本数据类型的变量
watch(() => state.name, async (n, o) => {})

// 监听 JSON
watch(state.obj, async (n, o) => {})

// 监听 JSON中某个字段
watch(() => state.obj.name, async (n, o) => {

}, {
    immediate: true,
    deep: true，
    flush: 'post'// 侦听器回调中能访问被 Vue 更新之后的 DOM
})

// 后置刷新 watchEffect
const todoId = ref(1)
const data = ref(null)
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})

// 后置刷新 watchPostEffect
import { watchPostEffect } from 'vue'
watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})

// 手动停止监听器
setTimeout(() => {
    const unwatch = watchEffect(() => {})
})
unwatch()
```
### 组件定义
- 全局注册
```
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```
- 局部注册
```
import ComponentA from './ComponentA.vue'
<ComponentA />
```
- 定义props
```
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  propF: {
    validator(value) {
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})
```
- computed 计算属性
```
const props = defineProps(['size'])
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```
- 事件
```
-----------------------------------------------
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
<MyButton @increase-by="(n) => count += n" />
-----------------------------------------------
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit', 123123132)
}
-----------------------------------------------
```
- v-model
```
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
-----------------------------------------------
第一种 
<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
-----------------------------------------------
第二种 computed
<!-- CustomInput.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input v-model="value" />
</template>

```
- 透传
https://cn.vuejs.org/guide/components/attrs.html
- 插槽
基本使用
```
BaseLayout.vue
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
</div>

<BaseLayout>
  12312313
  <template #header>
    <!-- header 插槽的内容放这里 -->
  </template>
  <!-- 动态插槽名 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</BaseLayout>
```
插槽父向子 传递数据
```
<!-- MyComponent.vue -->
<script setup>
const greetingMessage = 'hello'
</script>

<template>
  <div>
  	<slot :text="greetingMessage" :count="1"></slot>
	</div>
</template>

<!-- APP.vue -->
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
	<MyComponent v-slot="slotProps">
  	{{ slotProps.text }} {{ slotProps.count }}
  </MyComponent>
</template>
```
- 异步组件
基本使用
```
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```
高级用法
```
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```
### 组合式函数
### 自定义指令
- 全局注册
```
const app = createApp({})

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})
```
- 描述
```
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```
- 参数说明
```
el：指令绑定到的元素。这可以用于直接操作 DOM。
binding：一个对象，包含以下属性。
value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
instance：使用该指令的组件实例。
dir：指令的定义对象。
vnode：代表绑定元素的底层 VNode。
prevNode：之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。
```
- 如何使用自定义指令
```
<div v-example:foo.bar="baz">

接受到的值
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}

动态指令
<div v-example:[arg]="value"></div>

简化形式
<div v-color="color"></div>
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```
- 插件
```
插件编写
// plugins/i18n.js
export default {
  install: (app, options) => {
    // 注入一个全局可用的 $translate() 方法
    app.config.globalProperties.$translate = (key) => {
      // 获取 `options` 对象的深层属性
      // 使用 `key` 作为索引
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
    // 在组件中以 i18n 为 key 注入并访问插件的选项对象。
    app.provide('i18n', options)
  }
}

访问 i18n
<script setup>
import { inject } from 'vue'
const i18n = inject('i18n')
console.log(i18n.greetings.hello)
</script>

注册插件
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```
### 内置组件
- Transition：DOM元素的动画
- TransitionGroup：数组元素的添加和移除时用它，产生动画效果
- KeepAlive： TAB切换组件时， 用来缓存
- Teleport 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。
```
<!-- <Teleport> 接收一个 to prop 来指定传送的目标。to 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。这段代码的作用就是告诉 Vue“把以下模板片段传送到 body 标签下”。 -->
<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```
- Suspense  嵌套组件
### 应用规模化
https://cn.vuejs.org/guide/scaling-up/sfc.html
### 最佳实践
https://cn.vuejs.org/guide/best-practices/production-deployment.html
### typescript
https://cn.vuejs.org/guide/typescript/overview.html
### 进阶主题
https://cn.vuejs.org/guide/extras/ways-of-using-vue.html

- s






