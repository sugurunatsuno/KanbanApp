<template>
    <div class="login-view">
        <h1>Kanban App</h1>
        <KbnLoginForm :onlogin="handleLogin" />
    </div>
</template>

<script>
import KbnLoginForm from '@/components/molecules/KbnLoginForm.vue'

export default {
  name: 'KbnLoginView',
  components: {
    KbnLoginForm
  },

  methods: {
    handleLogin (authInfo) {
      return this.dispatch('login', authInfo)
        .then(() => {
          this.$router.push({path: '/'})
        })
        .catch(err => this.throwReject(err))
    }
  }
}
</script>

<style scoped>
.login-view{
    width: 320px;
    margin: auto;
}
</style>
