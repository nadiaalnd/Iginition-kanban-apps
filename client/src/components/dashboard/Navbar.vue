<template>
  <div>
    <b-navbar
        toggleable="lg"
        style="
        background-color: rgba(0, 0, 0, 0) !important;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1) !important;"
    >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-brand style="width: 100%">
          <b-img
            src="../../assets/images/kanbant_logo_nav.svg"
            height="35"
          ></b-img>
        </b-navbar-brand>
        <b-navbar-nav></b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right no-caret>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <i class="fas fa-user-circle" style="color: #9155FD; font-size: 32px"></i>
            </template>
            <b-dropdown-item>
              <h6>
                <i class="fas fa-user" style="color: #9155FD"></i>
                {{ user_email }}
              </h6>
            </b-dropdown-item>
            <hr>
            <b-dropdown-item>
              <h6 @click="logout()">
                <i class="fas fa-sign-out-alt" style="color: #9155FD"></i>
                Sign Out
              </h6>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: ["user_email"],
  methods: {
    logout() {
      this.$http
        .get("/auth/logout")
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          if (err.response.status === 500) {
            this.$router.push("/login");
          }
        });
    },
  },
};
</script>

<style></style>
