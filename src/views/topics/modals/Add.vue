<template>
    <div class="ui container">
        <modal title="aaaa" class="modal-primary" v-model="MyModal" @cancel="closeModal" @ok="saveItem"
               effect="fade/zoom">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">Add New Topic</h4>
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" v-model="data.title" class="form-control"
                       placeholder="Enter the title">
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <input type="text" id="content" v-model="data.content" class="form-control"
                       placeholder="Enter the content here">
            </div>
            <div class="form-group">
                <multiselect v-model="value" deselect-label="Remove the selected" track-by="id" label="name"
                             placeholder="Select one" :options="options" :searchable="true"
                             :allow-empty="true"
                             group-label="name"
                             group-values="models">
                </multiselect>

            </div>
            <div class="form-group">
                <label for="cover">Cover</label>
                <input type="file" id="cover" @change="onFileChange" class="form-control">
            </div>
        </modal>
    </div>
</template>

<script>
  /* eslint-disable quotes */
  import modal from 'vue-strap/src/Modal'

  export default {
    data () {
      return {
        value: null,
        options: [],
        formData: new FormData(),
        data: {
          title: this.title,
          content: this.content
        }
      }
    },
    computed: {
      MyModal () {
        return this.add_modal
      }
    },
    components: {
      modal
    },
    methods: {
      onFileChange (ele) {
        let files = ele.target.files || ele.dataTransfer.files
        if (!files.length) {
          return
        }
        this.formData.append('cover', files[0])
      },
      saveItem () {
        this.formData.append('title', this.data.title)
        this.formData.append('content', this.data.content)
        this.formData.append('model_id', this.value.id)
        // save topic
        this.$parent.$emit('addItem', this.formData)
      },
      closeModal () {
        this.$parent.addModal = false
      }
    },
    mounted () {
      this.$store.dispatch('getBrands').then(() => {
        this.options = this.$store.state.brands
      })
    },
    props: {
      add_modal: {
        type: Boolean,
        required: true
      }
    }
  }
</script>
