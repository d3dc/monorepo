<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <ul class="navbar-nav align-items-center d-none d-md-flex ml-md-auto">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-10">
                    <div class="media align-items-center" slot="title">
                      <span class="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder" src="/img/vue.jpg">
                      </span>
                      <div class="media-body ml-2">
                          <span class="mb-0 text-sm  font-weight-bold">Jessica Jones</span>
                      </div>
                    </div>

                    <template>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>My profile</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item" @click="logout">
                            <i class="ni ni-button-power"></i>
                            <span>Logout</span>
                        </a>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },
    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      logout() {
        this.$store.dispatch('system/logout').then(() => {
          this.$router.push('/login')
        })
      }
    }
  };
</script>
