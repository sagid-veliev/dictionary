<template>
    <label class="label">{{ props.labelTitle }}
        <input
            type="checkbox"
            :value="props.value"
            :checked="modelValue.includes(props.value)"
            @change="(event) => handleChange(event.target.value)"
        >
        <span class="checkmark"></span>
    </label>
</template>

<script setup>

const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
    labelTitle: {
        type: String,
        default: '',
    },
    checked: {
        type: Boolean,
        default: false,
    },
    value: {
        type: String,
        default: '',
    },
    modelValue: {
        type: Array,
        default: () => [],
    },
});

const handleChange = (value) => {
    if (props.modelValue.includes(props.value)) {
        emit('update:modelValue', props.modelValue.filter((item) => item !== value));
    } else {
        emit('update:modelValue', props.modelValue.concat(props.value));
    }
};

</script>

<style lang="scss" scoped>
.label {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 18px;
    user-select: none;
    & input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked ~ .checkmark {
            background-color: #2196f3;
            border-radius: 5px;
            &:after {
                display: block;
            }
        }
    }
    &:hover input ~ .checkmark {
        background-color: #e9f5ff;
    }
    & .checkmark:after {
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: white;
    border-radius: 5px;
    &:after {
        content: "";
        position: absolute;
        display: none;
    }
}
</style>
