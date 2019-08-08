<template>
  <footer class="footer px-4">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-12">
        <div class="copyright text-center text-lg-right text-muted">
          © {{year}} <a href="https://mikeroth.co" class="font-weight-bold ml-1" target="_blank">Roth Technologies, LLC</a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
