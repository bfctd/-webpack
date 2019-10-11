import Vue from "./node_modules/vue/dist/vue.esm.browser.js";
// 此处引入的是一个文件，用于浏览器版本
// 用于开发的时候，一般会引入vue.runtime.esm,这个版本会取消编译template的功能
// new Vue的template会用 render函数来替代

// 定义vue组件：
//一、全局 Vue.component('组件名'，{组件配置项}) 全局组件必须在new Vue之前
//二、局部 new Vue({components:{'局部组件名',{组件配置项}}})

var jubu1 = {
    inject: ['yeye','foo','d'], template: '<div>jubu1<m-quanju></m-quanju><br><br>{{d.val}}</div>', created() {
        console.log(this.yeye)
        console.log(this.foo)
        console.log(this.d.val)
        this.show = this.d.val
    }
}

export const tem = {
    components: {jubu1},
    template: `
        <div>
            <span @click="handPropFunc">root</span>
            <m-quanju></m-quanju>
            <jubu1 ref = "jubu"></jubu1>
            showshow
            {{show}}
        </div>
    `,
    data(){
        return {
            show:''
        }
    },
    props: {},
    mounted() {
    },
    methods: {
        handPropFunc() {
            this.$emit('func', '2')
        }
    }
}

export const double = {
    model: { // 使用自定义组件的v-model默认会调用DOM imput这个事件
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            type: String
        }
    },
    template: `
        <div>
            双向 绑定 <input type="text" :value="value" @input="changeFunc">
        </div>
    `,
    methods: {
        changeFunc(e) {
            console.log(e)
            this.$emit('change', e.target.value)
        }
    }
}

export const gaoji = {
    template: `
        <div>
            <!--插槽-->
            <slot name="top"></slot>
            <slot name="btm"></slot>
            <hr>
            <slot name="value" value="val"></slot>
        </div>
    `,
    data() {
        return {
            value: 'value'
        }
    }
}