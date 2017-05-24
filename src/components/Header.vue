<template>
    <navbar>
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
            &#9776;
        </button>
        <a class="navbar-brand" href="#"></a>
        <ul class="nav navbar-nav d-md-down-none">
            <li class="nav-item">
                <a class="nav-link navbar-toggler sidebar-toggler" href="#" @click="sidebarMinimize">&#9776;</a>
            </li>
            <router-link tag="li" to="/dashboard" class="nav-item px-3">
                <a class="nav-link">Dashboard</a>
            </router-link>
            <router-link tag="li" to="/users" class="nav-item px-3">
                <a class="nav-link">Users</a>
            </router-link>
            <router-link tag="li" to="/brands" class="nav-item px-3">
                <a class="nav-link" href="#">Brands</a>
            </router-link>
        </ul>
        <ul class="nav navbar-nav ml-auto">
            <li class="nav-item d-md-down-none">
                <a class="nav-link" href="#"><i class="icon-bell"></i><span
                        class="badge badge-pill badge-danger">5</span></a>
            </li>

            <dropdown size="nav" class="nav-item">
        <span slot="button">
          <img :src="user.cover_url" class="img-avatar" alt="admin@bootstrapmaster.com">
          <span v-if="user" class="d-md-down-none">{{ user.fullname }}</span>
        </span>
                <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right">

                    <div class="dropdown-header text-center"><strong>Account</strong></div>

                    <a class="dropdown-item" href="#"><i class="fa fa-envelope-o"></i> Messages<span
                            class="badge badge-success">42</span></a>
                    <a class="dropdown-item" href="#"><i class="fa fa-shield"></i> Discussions</a>

                    <div class="dropdown-header text-center"><strong>Settings</strong></div>

                    <a class="dropdown-item" href="#"><i class="fa fa-user"></i> Profile</a>
                    <a class="dropdown-item" href="#"><i class="fa fa-wrench"></i> Settings</a>
                    <div class="divider"></div>
                    <a class="dropdown-item" href="#"><i class="fa fa-lock"></i> Logout</a>
                </div>
            </dropdown>
            <li class="nav-item d-md-down-none">
                <a class="nav-link navbar-toggler aside-menu-toggler" href="#" @click="asideToggle">&#9776;</a>
            </li>
        </ul>
    </navbar>
</template>
<script>

  import navbar from './Navbar'
  import { dropdown } from 'vue-strap'

  export default {
    name: 'header',
    components: {
      navbar,
      dropdown
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      click () {
        // do nothing
      },
      sidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-hidden')
      },
      sidebarMinimize (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-minimized')
      },
      mobileSidebarToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-mobile-show')
      },
      asideToggle (e) {
        e.preventDefault()
        document.body.classList.toggle('aside-menu-hidden')
      }
    },
    created () {
      this.$store.dispatch('getAuthUser')
    }
  }
</script>
