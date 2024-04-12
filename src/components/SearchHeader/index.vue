<template>
    <div class="search-header">
        <div class="search-header-items">
            <slot name="search" />
        </div>

        <div class="search-header-buttons">
            <slot name="buttons" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
    name: 'SearchHeaderCmp'
})
</script>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.search-header {
    display: flex;
    flex: 1;
    background-color: #fff;

    &-items {
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 20px;

        :slotted(> div) {
            display: flex;
            flex-direction: row;
            align-items: center;

            > span{
                flex-grow: 0;
                flex-shrink: 0;
                padding-right: 10px;
                font-size: 14px;
            }

            &:not(:first-of-type) {
                margin-left: 20px;
            }
        }
    }

    &-buttons {
        display: flex;
        align-items: center;
        padding-right: 20px;
    }
}
</style>