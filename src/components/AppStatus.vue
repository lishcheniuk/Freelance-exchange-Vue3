<template>
  <span :class="['badge', getType.class]">{{ getType.text }}</span>
</template>
<script>
import { computed } from 'vue';

export default {
  props: ['type'],
  setup(props) {
    const types = {
      active: { class: 'primary', text: 'Активный' },
      done: { class: 'danger', text: 'Завершен' },
      cancelled: { class: 'danger', text: 'Отменен' },
      pending: { class: 'warning', text: 'Выполняется' }
    };

    const getType = computed(() => types[props.type] || types.active);

    return { getType };
  }
};
</script>
