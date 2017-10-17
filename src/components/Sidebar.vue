<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav">
                <li class="nav-item">
                    <router-link :to="'/dashboard'" class="nav-link"><i class="icon-speedometer"></i> Dashboard <span
                            class="badge badge-info">NEW</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="'/brands'" class="nav-link" exact><i class="fa fa-car"></i> Cars
                    </router-link>
                </li>
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/topics'}" disabled>
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick"><i class="icon-bubble"></i> Topics
                    </div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/topics'" class="nav-link" exact>Topics</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/topics/reported'" class="nav-link" exact>Reported Topics</router-link>
                        </li>
                    </ul>
                </router-link>
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/topics'}" disabled>
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick"><i class="icon-people"></i> Users
                    </div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/users'" class="nav-link" exact>Users</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/topics/reported'" class="nav-link" exact>Reported Users</router-link>
                        </li>
                    </ul>
                </router-link>
                <li class="nav-title">
                    Settings
                </li>
                <li class="nav-item">
                    <router-link :to="'/charts'" class="nav-link" exact><i class="icon-settings"></i> Settings
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>

  export default {
    name: 'sidebar',
    methods: {
      handleClick (e) {
        e.preventDefault()
        e.target.parentElement.classList.toggle('open')
      }
    }
  }
</script>

<style lang="css">
    .nav-link {
        cursor: pointer;
    }
</style>
