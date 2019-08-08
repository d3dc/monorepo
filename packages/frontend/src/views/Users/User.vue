<template>
    <div>
        <base-header type="gradient-primary" class="pb-7 pt-5 pt-md-8"/>

        <div class="container-fluid mt--7">
            <div class="row">

                <div class="col-xl-6 order-xl-1 col-lg-12">
                    <card shadow type="secondary" :class="{'loading':loading}">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <h3 class="mb-0">Account <span class="small text-muted">({{model.status}})</span></h3>
                                </div>
                                <div class="col-6 text-right">
                                    <a href="#!" class="btn btn-sm btn-primary">Change Status</a>
                                    <a href="#!" class="btn btn-sm btn-danger">Deactivate Account</a>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Email address"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.email"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Full name"
                                                        placeholder="Full name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.name"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Current Password"
                                                        placeholder="*********"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.password"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="New Password"
                                                        placeholder="*********"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.newPassword"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <label>Notifications</label>
                                            <base-checkbox class="custom-control-alternative" v-model="model.email_notification">
                                                <span class="text-muted">Email</span>
                                            </base-checkbox>
                                            <base-checkbox class="custom-control-alternative" disabled>
                                                <span class="text-muted">SMS (coming soon)</span>
                                            </base-checkbox>
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                    label="Rent"
                                                    placeholder="100.00"
                                                    input-classes="form-control-alternative"
                                                    v-model="model.rent"
                                                    disabled/>
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                    label="Commission"
                                                    placeholder="10%"
                                                    input-classes="form-control-alternative"
                                                    v-model="model.commision"
                                                    disabled/>
                                        </div>
                                        
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12">
                                            <base-button size="sm" type="primary" class="float-right">Update</base-button>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <!-- Address -->
                                <h6 class="heading-small text-muted mb-4">Business</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <base-input alternative=""
                                                        label="Legal Name"
                                                        placeholder="Legal Business Name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.business"
                                            />
                                        </div>
                                        <div class="col-md-6">
                                            <base-input alternative=""
                                                        label="Phone"
                                                        placeholder="Phone"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.phone"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <base-input alternative=""
                                                        label="Address"
                                                        placeholder="Business Address"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.address"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="City"
                                                        placeholder="City"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.city"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Postal code"
                                                        placeholder="Postal code"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.zipCode"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <base-input alternative="" label="Bio">
                                                <textarea 
                                                    rows="4" 
                                                    class="form-control form-control-alternative" 
                                                    placeholder="A few words about your business..." 
                                                    v-model="model.bio">
                                                </textarea>
                                            </base-input>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                    label="Instagram"
                                                    placeholder="@businessname"
                                                    input-classes="form-control-alternative"
                                                    v-model="model.instagram"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                    label="Facebook"
                                                    placeholder="facebook-page-name"
                                                    input-classes="form-control-alternative"
                                                    v-model="model.facebook"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                    label="Twitter"
                                                    placeholder="@businessname"
                                                    input-classes="form-control-alternative"
                                                    v-model="model.twitter"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12">
                                            <base-button size="sm" type="primary" class="float-right">Update</base-button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>

                <div class="col-xl-6 order-xl-2 mt-xl-0 mt-lg-5 mb-xl-0 col-lg-12">
                    <resources-table
                        title="Resources" 
                        :tableData="resources"
                        :columns="resourcesColumns"
                        :loading="loading"
                    ></resources-table>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
  import ResourcesTable from './ResourcesTable'
  
  export default {
    name: 'user-profile',
    components: {
      ResourcesTable
    },
    computed: {
        user() {
            return this.$store.getters['users/one'](this.$route.params.id)
        },
        transactions() {
            return this.user ? this.user.resources : []
        }
    },
    data() {
      return {
        model: {
          email: '',
          password: '',
          newPassword: '',
          name: '',
          business: '',
          address: '',
          city: '',
          country: '',
          zipCode: '',
        },
        resourcesColumns : [
          'ID',
          'Username',
          'Email',
          'Role',
          ''
        ],
        loading: true
      }
    },
    watch: {
        user() {
            this.model = Object.assign(this.model, this.user);
        }
    },
    mounted() {
        // get user
        this.$store.dispatch('users/get', this.$route.params.id).finally(() => {
            this.loading = false
        })
    },
  };
</script>
<style></style>
