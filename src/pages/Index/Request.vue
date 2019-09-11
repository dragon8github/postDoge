<template>
    <div class="Request">
        <a-tabs v-model="activeKey" type="editable-card" @edit="onEdit">
            <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
                <div class="request__top u-flex-sc">
                    <a-select defaultValue="GET" style="width: 120px" @change="handleChange">
                        <a-select-option value="GET">GET</a-select-option>
                        <a-select-option value="POST">POST</a-select-option>
                    </a-select>
                    <a-input placeholder="http://" class='request__top--input' />
                    <div class="request__top--btns u-flex-bc">
                        <a-dropdown-button @click="handleButtonClick" type="primary">
                            Send
                            <a-menu slot="overlay" @click="handleMenuClick">
                                <a-menu-item key="1">
                                    <a-icon type="user" />1st menu item</a-menu-item>
                                <a-menu-item key="2">
                                    <a-icon type="user" />2nd menu item</a-menu-item>
                                <a-menu-item key="3">
                                    <a-icon type="user" />3rd item</a-menu-item>
                            </a-menu>
                        </a-dropdown-button>
                        <a-dropdown-button @click="handleButtonClick">
                            Save
                            <a-menu slot="overlay" @click="handleMenuClick">
                                <a-menu-item key="1">
                                    <a-icon type="user" />1st menu item</a-menu-item>
                                <a-menu-item key="2">
                                    <a-icon type="user" />2nd menu item</a-menu-item>
                                <a-menu-item key="3">
                                    <a-icon type="user" />3rd item</a-menu-item>
                            </a-menu>
                        </a-dropdown-button>
                    </div>
                </div>
                <div class="request__form">
                    <a-tabs defaultActiveKey="1" @change="callback" class='request__form--tabs'>
                       <a-tab-pane tab="Params" key="1">Content of Tab Pane 1</a-tab-pane>
                       <a-tab-pane tab="Body" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
                       <a-tab-pane tab="Headers" key="3">Content of Tab Pane 3</a-tab-pane>
                       <a-tab-pane tab="Tests" key="4">Content of Tab Pane 4</a-tab-pane>
                     </a-tabs>
                </div>
                
                <div class='Response__text'>Response</div>
          
                <div class="response">
                    <div class='response__empty'>
                        <img src="@/assets/response__empty.svg" class='response__empty--img' />
                        <div class='response__empty--text'>Hit Send to get a response</div>
                        <a-divider> For you </a-divider>
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
export default {
    name: 'Request',
    data() {
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
            { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
        ]
        return {
            activeKey: panes[0].key,
            panes,
            newTabIndex: 0,
        }
    },
    methods: {
        handleButtonClick(e) {
            console.log('click left button', e);
        },
        handleMenuClick(e) {
            console.log('click', e);
        },
        handleChange(value) {
            console.log(`selected ${value}`);
        },
        callback(key) {
            console.log(key)
        },
        onEdit(targetKey, action) {
            this[action](targetKey)
        },
        add() {
            const panes = this.panes
            const activeKey = `newTab${this.newTabIndex++}`
            panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey })
            this.panes = panes
            this.activeKey = activeKey
        },
        remove(targetKey) {
            let activeKey = this.activeKey
            let lastIndex
            this.panes.forEach((pane, i) => {
                if (pane.key === targetKey) {
                    lastIndex = i - 1
                }
            })
            const panes = this.panes.filter(pane => pane.key !== targetKey)
            if (lastIndex >= 0 && activeKey === targetKey) {
                activeKey = panes[lastIndex].key
            }
            this.panes = panes
            this.activeKey = activeKey
        },
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

.Request {
    margin: 10px;
    width: 100%;
}

/deep/ .ant-tabs-new-tab {
    width: 26px;
    height: 39px;
    background: #DBDBDB;
    color: #333;
}

.request__top--input {
    margin-left: 10px;
    margin-right: 20px;
}

.request__top--btns {
    width: 260px;
}

.request__form {
  margin-top: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 250px;
}

/deep/ .request__form--tabs {
  margin: 10px;
}

.response {
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 250px;

}

.Response__text {
  color: #A9A9A9;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
}

.response {
  position: relative;
}

.response__empty {
  @include center;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

.response__empty--img {
  width: 140px;
  height: 140px;
  margin-top: 40px;
}

.response__empty--text {

}
</style>
