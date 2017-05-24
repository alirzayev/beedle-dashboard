<template>
    <div class="col-6 col-lg-3">
        <router-link to="/" class="card card-link">
            <div class="card-block p-0 clearfix">
                <img :src="model.cover_url" width="100" class="bg-info p-4 font-2xl mr-3 float-left">
                <div class="h5 text-warning mb-0 pt-3">{{ model.name }}</div>
                <div class="text-muted text-uppercase font-weight-bold font-xs">30 models</div>
            </div>
        </router-link>
    </div><!--/.col-->
</template>

<script>
    /* eslint-disable padded-blocks,indent,key-spacing */

    export default {
      props: ['model']
    }
</script>

