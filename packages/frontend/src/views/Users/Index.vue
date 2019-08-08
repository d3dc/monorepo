<template>
    <div>
        <base-header type="gradient-primary" class="pb-7 pt-5 pt-md-8"/>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <users-table title="Users" :tableData="users" :columns="columns" :loading="loading"></users-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import UsersTable from './UsersTable'
  export default {
    name: 'users',
    components: {
      UsersTable
    },
    computed: {
      users() {
        return this.$store.state.users.all
      }
    },
    data() {
      return {
        loading: true,
        columns:[
          'ID',
          'Username',
          'Email',
          'Role',
          ''
        ]
      }
    },
    mounted() {
      this.$store.dispatch('users/getAll').finally(() => (this.loading = false))
    }
  };
</script>
<style></style>
