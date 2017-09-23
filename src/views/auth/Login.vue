<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card-group mb-0">
                        <div class="card p-4">
                            <div class="card-block">
                                <h1>Login</h1>
                                <p class="text-muted">Sign In to your account</p>
                                <div class="input-group mb-3">
                                    <span class="input-group-addon"><i class="icon-user"></i></span>
                                    <input type="text" v-model="username" class="form-control" placeholder="Username">
                                </div>
                                <div class="input-group mb-4">
                                    <span class="input-group-addon"><i class="icon-lock"></i></span>
                                    <input type="password" v-model="password" class="form-control"
                                           placeholder="Password">
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <button type="button" class="btn btn-primary px-4" @click="login">Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        username: this.username,
        password: this.password
      }
    },
    methods: {
      login () {
        const data = {
          username: this.username,
          password: this.password,
          client_id: '2',
          client_secret: 'Bk6xkvVJ1uPjooooC6z0MOj6y2JRdREknJJzsm9u',
          grant_type: 'password'
        }
        this.$store.dispatch('login', data)
      }
    }
  }
</script>
