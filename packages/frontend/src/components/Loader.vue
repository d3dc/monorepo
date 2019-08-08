<template>
    <div class="loader-bar" :class="{'active': loading}">
        <div class="line"></div>
        <div class="subline inc"></div>
        <div class="subline dec"></div>
    </div>
</template>
<script>
    export default {
        computed: {
          loading() {
            return this.$store.getters['system/isLoading']
          }
        }
    }
</script>