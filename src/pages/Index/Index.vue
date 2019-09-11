<template>
    <div class="Index">
        <dgheader></dgheader>

        <main class='main'>
            <Menu></Menu>
            
            <Request></Request>
        </main>
    </div>
</template>

<script>
import dgheader from './Header'
import Menu from './Menu'
import Request from './Request'

export default {
    name: 'Index',
    components: { dgheader, Menu, Request, },
}
</script>
<style lang="scss" scoped>
@import "~@/scss/functions.scss";

.Index {
    height: 100%;
}

.main {
    @include flex(s, s);
    height: calc(100% - 60px);
}
</style>