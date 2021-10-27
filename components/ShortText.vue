<template>
    <div>
        <span>{{ displayText }}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isExpanded: false,
            chunks: [],
        }
    },
    props: {
        text: {
            type: String,
            required: true,
        },
        target: {
            type: Number,
            required: true,
        }
    },
    computed: {
        isTooLong(){
            return this.chunks.length === 2
        },
        displayText(){
            if(!this.isTooLong || this.isExpanded) return this.chunks.join(' ')
            return this.chunks[0] + '...'
        }
    },
    // created run both front and backend site and mounted run only frontend site
    created(){
        this.chunks = this.getChuncks()
    },
    methods: {
        getChuncks(){
            const position = this.text.indexOf(' ', this.target)
            if(this.text.length <= this.target || position === -1) return [this.text]
            return [this.text.substring(0, position), this.text.substring(position)]
        }
    }

}
</script>
