<template>
  <div class="card shadow" :class="{'loading':loading}">
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
              <a class="dropdown-item" href="#">Name</a>
              <a class="dropdown-item" href="#">Positiion</a>
              <a class="dropdown-item" href="#">Created</a>
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
                  type="hover table-sm"
                  thead-classes="thead-light"
                  tbody-classes="list"
                  :data="tableData"
                  :columns="columns">

        <template slot-scope="{row}">
          <td scope="row">
            {{row.id}}
          </td>
          <td>
            {{row.name}}
          </td>
          <td>
            {{row.position}}
          </td>
          <td>
            {{row.createdAt}}
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
    name: 'transactions-table',
    props: {
      type: {
        type: String
      },
      title: String,
      tableData: Array,
      columns: Array,
      loading: Boolean
    }
  }
</script>
