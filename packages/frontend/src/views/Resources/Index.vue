<template>
    <div>
        <base-header type="gradient-primary" class="pb-7 pt-5 pt-md-8"/>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <resources-table title="Resources" :tableData="resources" :columns="columns" :loading="loading"></resources-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import ResourcesTable from './ResourcesTable'
  export default {
    name: 'resources',
    components: {
      ResourcesTable
    },
    computed: {
      resources() {
        return this.$store.state.resources.all
      }
    },
    data() {
      return {
        loading: true,
        columns : [
          'ID',
          'Name',
          'Position',
          'Created',
          ''
        ]
      }
    },
    mounted() {
      this.$store.dispatch('resources/getAll', 100).finally(() => (this.loading = false))
    }
  };
</script>
