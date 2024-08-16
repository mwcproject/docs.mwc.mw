<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;

    // Redirect only if the path is exactly /wallet/ledger (without trailing slash)
    if (currentPath === '/wallet/ledger') {
      window.location.replace('/wallet/ledger/get-started');
    }
  }
});
</script>