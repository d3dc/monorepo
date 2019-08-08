<template>
  <div class="card shadow" :class="{'loading': loading}">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">
            {{title}}
          </h3>
        </div>
        <div class="col text-right">
          <base-dropdown position="right">
            <a slot="title" class="btn btn-sm btn-primary text-white" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort By
            </a>
            <template>
              <a class="dropdown-item" href="#">ID</a>
              <a class="dropdown-item" href="#">Username</a>
              <a class="dropdown-item" href="#">Email</a>
              <a class="dropdown-item" href="#">Role</a>
            </template>
          </base-dropdown>
          <a href="#" class="btn btn-sm btn-primary text-white" role="button">
            Export
          </a>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"  
                  @click="navigate"
                  type="hover table-sm"
                  thead-classes="thead-light"
                  tbody-classes="list"
                  :data="tableData"
                  :columns="columns">

        <template slot-scope="{row}">
          <td>
            {{row.id}}
          </td>
          <td>
            {{row.username}}
          </td>
          <td>
            <span class="name mb-0 text-sm">{{row.email}}</span>
          </td>
          <td>
            {{row.role}}
          </td>
          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
                           
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a class="dropdown-item" href="#">
                   <i class="fa fa-edit"></i> Edit
                </a>
                <a class="dropdown-item" href="#">
                  <i class="ni ni-fat-remove"></i> Delete
                </a>
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end">
      <base-pagination :total="30" ></base-pagination>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'users-table',
    props: {
      loading:  Boolean,
      type: {
        type: String
      },
      title: String,
      tableData: Array,
      columns: Array
    },
    methods: {
      getStatusType(status) {
        switch(status) {
          case 'active':
            return 'success'
          case 'pending':
            return 'warning'
          default:
            return 'info'
        }
      },
      navigate(event, id) {
        this.$router.push('/users/'+id)
      }
    }
  }
</script>
<style>
</style>
