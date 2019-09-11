<template>
    <header class='header'>
        <a class="header__logo">
            <img src="@/assets/logo.png" alt="logo" class='header__logo--img'>
            <span class='header__logo--title'>PostDoge</span>
        </a>
        <div class="header__workspace u-flex-sc">
            <div class='header__workspace--select u-flex-sc u-mr-1 u-cup'>
                <a-icon type="appstore" class='icon-appstore' />
                <div class='header__workspace--text'>My Workspace</div>
                <a-icon type="caret-down" class='icon-down' />
            </div>
            <a-button type="primary" icon="user-add" class='header__workspace--Invite'>Invite</a-button>
        </div>
        <div class="header__env">
            <a-select class='header__env--select' :size="size" defaultValue="No Environment" style="width: 200px" @change="handleChange">
                <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                    {{(i + 9).toString(36) + i}}
                </a-select-option>
            </a-select>
            <a-button type="primary" shape="circle" icon="setting" :size="size" class='header__env--setting' />
        </div>
    </header>
</template>
<script>
export default {
    name: 'dgheader',
    data() {
        return {

        }
    },
    methods: {
        go() {

        }
    },
    components: {

    },
    computed: {

    },
    watch: {

    },
    beforeMount() {

    }
}
</script>
<style lang="scss" scoped>
@import "~@/scss/functions.scss";

.header {
    @include flex(b, c);
    height: 60px;
    padding: 0 10px;
    font-size: 16px;
    color: #fff;
    background-color: #303030;
}

.header__logo--img {
    width: 35px;
    height: 35px;
    margin-right: 10px;
}

.header__logo--title {
    font-family: Delius Swash Caps, cursive;
    color: #f1f1f1;
    font-size: 18px;
}

.header__workspace {
    position: relative;
    left: 80px;

    /deep/ .ant-btn {
        height: 26px;
        font-weight: bold;
        background-color: #464646;
        border-color: #464646;
        padding: 0 10px;
    }
}

.header__workspace--select {

}

.header__workspace--text {
    position: relative;
    top: -1px;
    margin-left: 8px;
    margin-right: 5px;
}

.header__env--setting {
  margin-left: 10px;
  background-color: #464646;
  border-color: #464646;
}

.icon-appstore {
    font-size: 20px;
}

.icon-down {
    font-size: 12px;
}


/deep/ .ant-select-selection {
  background-color: #ECECEC;
}

/deep/ .ant-select {
  color: #333;
}

/deep/ .header__env--select {
    font-size: 14px;
}
</style>