<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card-group mb-0">
                        <div class="card p-4">
                            <div class="card-block">
                                <h1>Add Brand</h1>
                                <p class="text-muted">Add new brand</p>
                                <div class="input-group mb-3">
                                    <span class="input-group-addon"><i class="icon-user"></i></span>
                                    <input type="text" v-model="brandname" class="form-control"
                                           placeholder="Enter brand name">
                                </div>
                                <div class="form-group">
                                    <label for="cover">Cover</label>
                                    <input type="file" @change="onFileChange" id="cover" class="form-control">
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <button type="button" class="btn btn-primary px-4" @click="addBrand">Add

                                        </button>
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
    /* eslint-disable padded-blocks,indent,no-unused-vars */

    import BrandService from '../../api/brand'

    export default {
      name: 'create',
      data () {
        return {
          brandname: this.brandname,
          formData: new FormData()
        }
      },
      methods: {
        addBrand () {

          this.formData.append('name', this.brandname)

          BrandService.create(this.formData)
            .then((response) => {
              console.log('created data', response)
              this.$router.push('/brands')
            })
        },
        onFileChange (ele) {

          let files = ele.target.files || ele.dataTransfer.files
          if (!files.length) {
            return
          }

          this.formData.append('cover', files[0])
        }
      }
    }
</script>
