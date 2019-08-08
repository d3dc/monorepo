<template>
    <div class="main-content bg-lighter">
        <!-- Header -->
        <div class="header bg-gradient-primary py-7 py-lg-6">
            <div class="container">
                <div class="header-body text-center mb-7">
                    <div class="row justify-content-center">
                        <div class="col-lg-3 col-md-5">
                            <img src="/img/logo-blk.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="separator separator-bottom separator-skew zindex-100">
                <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <polygon class="fill-neutral" points="2560 0 2560 100 0 100"></polygon>
                </svg>
            </div>
        </div>
        <!-- Page content -->
        <div class="container mt--8 py-5">
            <slide-y-up-transition mode="out-in" origin="center top">
                <router-view></router-view>
            </slide-y-up-transition>
        </div>
        <footer class="py-5">
            <div class="container">
                <div class="row align-items-center justify-content-xl-between">
                    <div class="col-xl-12">
                        <div class="copyright text-center text-lg-right text-muted">
                        © {{year}} <a href="https://mikeroth.co" class="font-weight-bold ml-1" target="_blank">Roth Technologies, LLC</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
  import { SlideYUpTransition } from 'vue2-transitions'
  import ContentFooter from './ContentFooter.vue';
  
  export default {
    name: 'auth-layout',
    components: {
      SlideYUpTransition,
      ContentFooter
    },
    data() {
      return {
        year: new Date().getFullYear(),
        showMenu: false
      }
    }
  }
</script>
