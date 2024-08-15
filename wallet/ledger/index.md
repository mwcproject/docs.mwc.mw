<script setup>
import { useRouter } from 'vitepress';
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
  if (router && typeof router.go === 'function') {
    router.go('/wallet/ledger/get-started');
  } else {
    console.error('Router is not initialized or go is not a function');
  }
});
</script>
