<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.location.replace('/wallet/ledger/get-started');
  } else {
    console.error('window is not defined');
  }
});
</script>