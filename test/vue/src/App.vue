<template>
<form>
    <p>
        選択されているもの: <input type="text" disabled="disabled" :value="input_text" />
    </p>
    <p>
        <select v-model="selected" @change="onchanged">
            <option :value="{ label: 'apple' }">りんご</option>
            <option :value="{ label: 'orange' }">みかん</option>
            <option :value="{ label: 'banana' }">バナナ</option>
            <option :value="{ label: 'strawberry' }">いちご</option>
        </select>
    </p>
</form>
</template>

<script>
export default {
    data() {
        return {
            selected: {label: ''},
            input_text: '',
        }
    },
    methods: {
        onchanged() {
            this.input_text = this.selected.label;
        }
    }
}
</script>
