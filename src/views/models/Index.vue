<template>
    <div>
        <div class="marginned">
            <router-link :to="{ path: '/brands/'+brand.name+'/create', query:{id:brand.id}}"
                         class="btn btn-primary px-4 text-centered">Add


            </router-link>
        </div>

        <div class="animated fadeIn">
            <div class="row">
                <BrandModel v-for="model in brand.models" :model="model"></BrandModel>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable padded-blocks,indent,key-spacing */

    import Model from './Model.vue'
    import ModelServices from '../../api/model'

    export default {
      data () {
        return {
          brand: {},
          params: this.$route.params.id
        }
      },
      components: {
        BrandModel: Model
      },
      created () {
        ModelServices.models(this.$route.params.id)
          .then((response) => {
            console.log(response.body)
            this.brand = response.body.brand
          })
      }
    }
</script>

<style>
    .marginned {
        margin: 10px 0px 10px 0px;
    }

</style>

