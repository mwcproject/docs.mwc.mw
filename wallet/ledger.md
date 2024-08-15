<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;

    // Check if the current path is exactly /wallet/ledger
    if (currentPath === '/wallet/ledger') {
      // Redirect to /wallet/ledger/get-started or /wallet/ledger/
      window.location.replace('/wallet/ledger/get-started');
    }
  }
});
</script>
