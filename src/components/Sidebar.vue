<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav">
                <li class="nav-item">
                    <router-link :to="'/dashboard'" class="nav-link"><i class="icon-speedometer"></i> Dashboard <span
                            class="badge badge-info">NEW</span></router-link>
                </li>
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/icons'}" disabled>
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick"><i class="fa fa-car"></i> Cars</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/brands'" class="nav-link" exact><i class="icon-star"></i>
                                Brands
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/models'" class="nav-link" exact><i
                                    class="icon-star"></i> Models
                            </router-link>
                        </li>
                    </ul>
                </router-link>
                <li class="nav-item">
                    <router-link :to="'/topics'" class="nav-link" exact><i class="icon-bubble"></i> Topics
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="'/users'" class="nav-link" exact><i class="icon-people"></i> Users
                    </router-link>
                </li>
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
