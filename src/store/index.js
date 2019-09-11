import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import AppData from './modules/AppData'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: false,
    state: {
        // 当前标题
        title: '',
        // 记录来路，现在还没有任何作用和使用场景，但没准以后有呢？先留着吧。
        back: { title: '首页', path: '/' },
    },
    actions: {
        // 更新页面标题，这个标题内容十分重要不可儿戏。因为关系到 'FETCH_DATA' 的判断
        SET_TITLE ({state, comit, dispatch}, title) {
            state.title = title
        },
    },
    modules: {
        AppData,
    },
})

export default store