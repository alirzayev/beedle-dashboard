<template>
    <div class="col-6 col-lg-3">
        <router-link :to='url' class="card card-link">
            <div class="card-block p-0 clearfix">
                <img :src="brand.cover_url" width="100" class="bg-warning p-4 font-2xl mr-3 float-left">
                <div class="h5 text-warning mb-0 pt-3">{{ brand.name }}</div>
                <div class="text-muted text-uppercase font-weight-bold font-xs">{{brand.models_count}} models</div>
            </div>
        </router-link>
    </div><!--/.col-->
</template>

<script>
    /* eslint-disable padded-blocks,indent,key-spacing */
    export default {
      computed: {
        url () {
          return 'brands/' + this.brand.id + '/models'
        }
      },
      props: ['brand', 'url']
    }
</script>

