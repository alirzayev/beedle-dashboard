<template>
    <div>
        <div class="marginned">
            <router-link :to="{ path: '/brands/create'}" class="btn btn-primary px-4 text-centered">Add


            </router-link>
        </div>
        <div class="animated fadeIn">
            <div class="row">
                <Brand v-for="brand in brands" :brand="brand" :id="brand.id"></Brand>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable padded-blocks,indent,key-spacing */

    import Brand from './Brand.vue'
    import brandServices from '../../api/brand'

    export default {
      data () {
        return {
          brands: []
        }
      },
      components: {
        Brand: Brand
      },
      created () {
        brandServices.brands()
          .then((response) => {
            console.log(response.body)
            this.brands = response.body.brands
          })
      }
    }
</script>

<style>

</style>

